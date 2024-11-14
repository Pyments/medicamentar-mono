package com.medicamentar.medicamentar_api.application.dtos.userDto;

public record UserRequest(

    String name,
    int age,
    double weigth,
    String bloodType,
    String address,
    double height
    
) {}
