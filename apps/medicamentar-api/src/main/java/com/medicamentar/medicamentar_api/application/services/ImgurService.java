package com.medicamentar.medicamentar_api.application.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.medicamentar.medicamentar_api.application.dtos.userDto.ImgurResponse;
import com.medicamentar.medicamentar_api.application.exception.ImgurUploadException;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ImgurService {
    private WebClient webClient;

    @Value("${imgur.client.api-url}")
    private String apiUrl;

    @Value("${imgur.client.id}")
    private String clientId;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final int TARGET_SIZE = 300;

    @PostConstruct
    private void init() {
        log.info("Iniciando ImgurService...");

        if (clientId == null || clientId.trim().isEmpty()) {
            log.error("Imgur Client ID não configurado!");
            throw new IllegalStateException(
                    "Imgur Client ID não configurado! Configure em application.properties ou variável de ambiente IMGUR_CLIENT_ID");
        }

        this.webClient = WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("Authorization", "Client-ID " + clientId)
                .build();

        log.info("ImgurService iniciado com sucesso!");
    }

    public String storeFile(MultipartFile file) {
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("Arquivo muito grande. Tamanho máximo permitido: 5MB");
        }

        try {
            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            if (originalImage == null) {
                throw new RuntimeException("Arquivo não é uma imagem válida");
            }

            BufferedImage resizedImage = resizeImage(originalImage);
            byte[] imageBytes = convertToBytes(resizedImage, getFileExtension(file.getOriginalFilename()));
            return uploadImage(imageBytes);
        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível processar a imagem", ex);
        }
    }

    private String uploadImage(byte[] imageBytes) {
        try {
            log.info("Iniciando upload de imagem para o Imgur...");

            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            ImgurResponse response = webClient.post()
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(BodyInserters.fromFormData("image", base64Image))
                    .retrieve()
                    .onStatus(status -> status.isError(), clientResponse -> {
                        // Captura o corpo da resposta de erro
                        return clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    log.error("Erro no upload para o Imgur. Status: {}. Resposta: {}",
                                            clientResponse.statusCode(), errorBody);
                                    return Mono.error(new ImgurUploadException(
                                            "Falha ao fazer upload da imagem para o Imgur. Status: " +
                                                    clientResponse.statusCode() + ". Resposta: " + errorBody));
                                });
                    })
                    .bodyToMono(ImgurResponse.class)
                    .block();

            if (response != null && response.getData() != null && response.getData().getLink() != null) {
                String imageUrl = response.getData().getLink();
                log.info("Upload realizado com sucesso. URL: {}", imageUrl);
                return imageUrl;
            }

            log.error("Resposta do Imgur é nula ou inválida");
            throw new ImgurUploadException("Falha ao fazer upload da imagem para o Imgur: resposta inválida");

        } catch (Exception e) {
            if (e instanceof WebClientResponseException) {
                WebClientResponseException wcre = (WebClientResponseException) e;
                String responseBody = wcre.getResponseBodyAsString();
                log.error("Erro detalhado do Imgur - Status: {}, Resposta: {}",
                        wcre.getStatusCode(), responseBody);
            }
            throw new ImgurUploadException("Erro ao fazer upload da imagem: " + e.getMessage(), e);
        }
    }

    private BufferedImage resizeImage(BufferedImage originalImage) {
        // Implementação para redimensionar a imagem
        return originalImage;
    }

    private byte[] convertToBytes(BufferedImage image, String fileExtension) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, fileExtension, baos);
            return baos.toByteArray();
        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível converter a imagem para bytes", ex);
        }
    }

    private String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex == -1) {
            throw new RuntimeException("Extensão do arquivo não encontrada");
        }
        return fileName.substring(lastDotIndex + 1);
    }
}