package com.medicamentar.medicamentar_api.application.dtos.userDto;

import org.springframework.web.multipart.MultipartFile;

public record UserRequest(

    String name,
    Integer age,
    Double weigth,
    String bloodType,
    String address,
    Double height,
    MultipartFile profileImage
    
) {}
