package com.medicamentar.medicamentar_api.application.exception;

public class ImgurUploadException extends RuntimeException {
    
    public ImgurUploadException(String message) {
        super(message);
    }

    public ImgurUploadException(String message, Throwable cause) {
        super(message, cause);
    }
} 