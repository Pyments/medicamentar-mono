package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record MedicationRequest (
        @NotBlank(message = "O campo 'Nome' não pode estar em branco.")
        String name,
        @NotNull(message = "O campo 'Tipo' não pode estar em branco.")
        String type,
        @NotBlank(message = "O campo 'Dose' não pode estar em branco.")
        String dose,
        @NotNull(message = "O campo 'Quantidade' não pode estar em branco.")
        Double amount,
        @NotBlank(message = "O campo 'Unidade' não pode estar em branco.")
        String unity,
        @NotNull(message = "Defina o período inicial da medicação.")
        Date period,
        @NotNull(message = "Informe a validade.")
        Date validate
) {
}