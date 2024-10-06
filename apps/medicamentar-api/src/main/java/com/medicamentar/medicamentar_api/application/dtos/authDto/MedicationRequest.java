package com.medicamentar.medicamentar_api.application.dtos.authDto;

import jakarta.validation.constraints.NotBlank;

public record MedicationRequest (
        @NotBlank(message = "name cannot be blank ")
        String name,
        @NotBlank(message = "Invalid  format")
        String dose,
        @NotBlank(message = "Password cannot be blank")
        Double amount



) {



    /*String name,
    String type,
    String dose,
    Double amount,
    String unity,
    Date period,
    Date validate*/
}

