package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record UpdateRequest (
        @NotBlank(message = "Name can't be blank")
        String name,
        @NotBlank(message = "Dose can't be blank")
        String dose,
        @NotBlank(message = "Amount can't be blank")
        Double amount,
        @NotNull(message = "Period can't be Null")
        Date period,
        @NotNull(message = "Validate can't be Null")
        Date validate
) {}
