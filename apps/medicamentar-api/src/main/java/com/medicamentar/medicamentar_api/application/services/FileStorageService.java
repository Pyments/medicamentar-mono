package com.medicamentar.medicamentar_api.application.services;

import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.medicamentar.medicamentar_api.application.dtos.userDto.ImgurResponse;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.Image;
import java.io.ByteArrayOutputStream;

import com.medicamentar.medicamentar_api.infrastructure.config.ImgurConfig;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Base64;

@Service
@Slf4j
public class FileStorageService {
    private final ImgurConfig imgurConfig;
    private final WebClient webClient;
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final int TARGET_SIZE = 300;

    public FileStorageService(ImgurConfig imgurConfig) {
        this.imgurConfig = imgurConfig;
        this.webClient = WebClient.builder()
            .baseUrl(imgurConfig.getApiUrl())
            .defaultHeader("Authorization", "Client-ID " + imgurConfig.getId())
            .build();
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
            
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            ImgurResponse response = webClient.post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("image", base64Image))
                .retrieve()
                .bodyToMono(ImgurResponse.class)
                .block();

            if (response != null && response.getData() != null) {
                return response.getData().getLink();
            }

            throw new RuntimeException("Falha ao fazer upload da imagem para o Imgur");
        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível processar a imagem", ex);
        }
    }

    private BufferedImage resizeImage(BufferedImage originalImage) {
        int originalWidth = originalImage.getWidth();
        int originalHeight = originalImage.getHeight();

        int newWidth, newHeight;
        if (originalWidth > originalHeight) {
            newWidth = TARGET_SIZE;
            newHeight = (TARGET_SIZE * originalHeight) / originalWidth;
        } else {
            newHeight = TARGET_SIZE;
            newWidth = (TARGET_SIZE * originalWidth) / originalHeight;
        }

        Image resultingImage = originalImage.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);
        BufferedImage outputImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
        outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);

        return outputImage;
    }

    private byte[] convertToBytes(BufferedImage image, String format) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, format, baos);
        return baos.toByteArray();
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    }
} 