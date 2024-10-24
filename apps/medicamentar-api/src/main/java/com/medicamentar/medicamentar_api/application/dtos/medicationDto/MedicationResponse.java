package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;
import java.util.Date;

public record MedicationResponse (
    UUID id,
    @NotBlank(message = "Name can't be blank")
    String name,
    @NotNull(message = "Type can't be blank")
    String type,
    @NotBlank(message = "Dose can't be blank")
    String dose,
    @NotBlank(message = "Amount can't be blank")
    Double amount,
    @NotBlank(message = "Unity can't be blank")
    String unity,
    @NotNull(message = "Period can't be Null")
    Date period,
    @NotNull(message = "Validate can't be Null")
    Date validate
)
{}
