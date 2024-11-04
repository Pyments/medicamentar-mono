package com.medicamentar.medicamentar_api.application.dtos.authDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "O nome não pode estar em branco") 
    @Size(min = 3, max = 150, message = "O nome deve ter entre 3 e 150 caracteres") 
    String name,

    @NotBlank(message = "O e-mail não pode estar em branco") 
    @Email(message = "Formato de e-mail inválido") 
    String email,
    
    @Size(min = 8, max = 120, message = "A senha deve ter no mínimo 8 caracteres")
    @Pattern(regexp = "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).*$", 
             message = "A senha deve conter pelo menos um caractere especial")
    String password,
    String confirmPassword) {
}