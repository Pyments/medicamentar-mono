package com.medicamentar.medicamentar_api.application.services;

import java.util.Base64;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.medicamentar.medicamentar_api.application.dtos.userDto.ImgurResponse;
import com.medicamentar.medicamentar_api.application.exception.ImgurUploadException;
import com.medicamentar.medicamentar_api.infrastructure.config.ImgurConfig;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ImgurService {
    private final WebClient webClient;

    public ImgurService(ImgurConfig imgurConfig) {

        log.info("Iniciando ImgurService...");
        
        String apiUrl = imgurConfig.getApiUrl();
        String clientId = imgurConfig.getId();

        if (clientId == null || clientId.trim().isEmpty()) {
            clientId = System.getenv("IMGUR_CLIENT_ID");
        }

        if (clientId == null || clientId.trim().isEmpty()) {
            log.error("Imgur Client ID não configurado!");
            throw new IllegalStateException("Imgur Client ID não configurado! Configure em application.properties ou variável de ambiente IMGUR_CLIENT_ID");
        }

        this.webClient = WebClient.builder()
            .baseUrl(apiUrl)
            .defaultHeader("Authorization", "Client-ID " + clientId)
            .build();
            
        log.info("ImgurService iniciado com sucesso!");
    }

    public String uploadImage(byte[] imageBytes) {
        try {
            log.info("Iniciando upload de imagem para o Imgur...");
            
            // Converte a imagem para Base64
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            // Faz a requisição para o Imgur
            ImgurResponse response = webClient.post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("image", base64Image))
                .retrieve()
                .bodyToMono(ImgurResponse.class)
                .block();

            // Verifica se a resposta é válida
            if (response != null && response.getData() != null && response.getData().getLink() != null) {
                String imageUrl = response.getData().getLink();
                log.info("Upload realizado com sucesso. URL: {}", imageUrl);
                return imageUrl;
            }

            log.error("Resposta do Imgur é nula ou inválida");
            throw new ImgurUploadException("Falha ao fazer upload da imagem para o Imgur: resposta inválida");
            
        } catch (Exception e) {
            log.error("Erro ao fazer upload para o Imgur", e);
            throw new ImgurUploadException("Erro ao fazer upload da imagem: " + e.getMessage(), e);
        }
    }
}