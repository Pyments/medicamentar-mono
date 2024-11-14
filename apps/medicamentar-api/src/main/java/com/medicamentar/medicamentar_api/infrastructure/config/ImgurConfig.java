package com.medicamentar.medicamentar_api.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Component
@ConfigurationProperties(prefix = "imgur.client")
@Getter
@Setter
@Slf4j
public class ImgurConfig {
    private String id;
    private String secret;
    private String apiUrl = "https://api.imgur.com/3/image";

    @PostConstruct
    public void init() {
        log.info("ImgurConfig initialized with clientId: {}", 
            id != null ? id.substring(0, 6) + "..." : "null");
        log.info("ImgurConfig initialized with apiUrl: {}", apiUrl);
    }
} 