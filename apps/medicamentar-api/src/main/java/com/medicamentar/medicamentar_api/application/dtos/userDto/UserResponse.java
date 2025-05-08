package com.medicamentar.medicamentar_api.application.dtos.userDto;

public record UserResponse(

    String name,
    String email,
    int age,
    String bloodType,
    String address,
    double height,
    double weigth,
    String profileImage
    
) {}