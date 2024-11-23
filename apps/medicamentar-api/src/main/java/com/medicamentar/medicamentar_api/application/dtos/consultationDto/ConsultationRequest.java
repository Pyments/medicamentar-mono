package com.medicamentar.medicamentar_api.application.dtos.consultationDto;

import java.time.ZonedDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ConsultationRequest (
        @NotNull(message = "O campo 'Data' não pode estar vazio.")
        ZonedDateTime date,
        @NotBlank(message = "O campo 'Nome' não pode estar vazio.")
        String doctorName,
        @NotBlank(message = "O campo 'Local' não pode estar vazio.")
        String local,
        @NotBlank(message = "Registre alguma observação.")
        String description
){}