package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;

import com.medicamentar.medicamentar_api.domain.entities.OphthalmicDetails;
import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.enums.MedicationUnity;

public record MedicationRequest (
        @NotBlank(message = "O campo 'Nome' não pode estar em branco.")
        String name,
        @NotNull(message = "O campo 'Tipo' não pode estar em branco.")
        MedicationType type,
        @NotNull(message = "O campo 'Dose' não pode estar em branco.")
        Integer dose,
        @NotNull(message = "O campo 'Quantidade' não pode estar em branco.")
        Double amount,
        @NotNull(message = "O campo 'Unidade' não pode estar em branco.")
        MedicationUnity unity,
        @NotNull(message = "Defina o período inicial da medicação.")
        int period,
        boolean isContinuousUse,
        @NotNull(message = "Informe a data de inicio.")
        ZonedDateTime start_date,
        OphthalmicDetails ophthalmicDetails
) {
}
