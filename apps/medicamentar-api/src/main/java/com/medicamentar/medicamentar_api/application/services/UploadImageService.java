package com.medicamentar.medicamentar_api.application.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;

@Service
public class UploadImageService {

    @Value("${imgbb.client.api-url}")
    private String apiUrl;

    @Value("${imgbb.client.id}")
    private String clientId;

    public String uploadImage(MultipartFile imageFile) throws Exception {
        if (imageFile == null || imageFile.isEmpty()) {
            throw new IllegalArgumentException("Arquivo de imagem inválido ou vazio.");
        }

        byte[] fileContent = imageFile.getBytes();
        String encodedImage = Base64.getEncoder().encodeToString(fileContent);

        String boundary = "----WebKitFormBoundary" + System.currentTimeMillis();

        String requestBody = "--" + boundary + "\r\n" +
                            "Content-Disposition: form-data; name=\"key\"\r\n\r\n" +
                            clientId + "\r\n" +
                            "--" + boundary + "\r\n" +
                            "Content-Disposition: form-data; name=\"image\"\r\n\r\n" +
                            encodedImage + "\r\n" +
                            "--" + boundary + "--\r\n";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("Erro ao fazer upload da imagem: " + response.body());
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonResponse = mapper.readTree(response.body());
        String imageUrl = jsonResponse.get("data").get("url").asText();

        return imageUrl;
    }
}