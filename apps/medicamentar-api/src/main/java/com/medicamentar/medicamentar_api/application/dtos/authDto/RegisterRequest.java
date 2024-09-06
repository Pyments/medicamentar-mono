package com.medicamentar.medicamentar_api.application.dtos.authDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Name cannot be blank") 
    @Size(min = 3, max = 150, message = "Name must be between 3 and 150 characters") 
    String name,

    @NotBlank(message = "Email cannot be blank") 
    @Email(message = "Invalid email format") 
    String email,
    
    @NotBlank(message = "Password cannot be blank") 
    @Size(min = 6, max = 120, message = "Password must be between 6 and 120 characters") 
    String password,
    String confirmPassword) {
}