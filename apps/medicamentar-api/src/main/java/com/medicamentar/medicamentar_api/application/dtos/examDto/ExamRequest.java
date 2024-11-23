package com.medicamentar.medicamentar_api.application.dtos.examDto;

import java.time.ZonedDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ExamRequest(
    @NotNull(message = "Informe a data do exame.")
    ZonedDateTime date,
    @NotBlank(message = "O campo 'Nome' não pode estar em branco.")
    String name, 
    @NotBlank(message= "O campo 'Local' não pode estar em branco.")
    String local,
    
    String description) {
    
}