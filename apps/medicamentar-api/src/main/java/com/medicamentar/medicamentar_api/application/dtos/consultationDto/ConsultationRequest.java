package com.medicamentar.medicamentar_api.application.dtos.consultationDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ConsultationRequest (
        @NotNull(message = "Date can't be blank")
        Date date,
        @NotBlank(message = "Name can't be blank")
        String doctorName,
        @NotBlank(message = "local can't be blank")
        String local,
        @NotBlank(message = "Description cannot be blanck")
        String description
){}