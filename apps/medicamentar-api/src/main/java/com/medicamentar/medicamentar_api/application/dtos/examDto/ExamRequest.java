package com.medicamentar.medicamentar_api.application.dtos.examDto;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ExamRequest(
    @NotNull(message = "Informe a data do exame.")
    Date date,
    @NotBlank(message = "O campo 'Nome' não pode estar em branco.")
    String name, 
    @NotBlank(message= "O campo 'Local' não pode estar em branco.")
    String local,
    
    String description) {
    
}