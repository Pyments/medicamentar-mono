package com.medicamentar.medicamentar_api.application.dtos.consultationDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ConsultationRequest (
        @NotNull(message = "O campo 'Data' não pode estar vazio.")
        Date date,
        @NotBlank(message = "O campo 'Nome' não pode estar vazio.")
        String doctorName,
        @NotBlank(message = "O campo 'Local' não pode estar vazio.")
        String local,
        @NotBlank(message = "Registre alguma observação.")
        String description
){}