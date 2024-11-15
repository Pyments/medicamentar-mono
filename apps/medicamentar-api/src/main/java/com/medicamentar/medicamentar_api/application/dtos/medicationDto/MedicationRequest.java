package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

import com.medicamentar.medicamentar_api.domain.entities.OphthalmicDetails;
import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.enums.MedicationUnity;

public record MedicationRequest (
        @NotBlank(message = "O campo 'Nome' não pode estar em branco.")
        String name,
        @NotNull(message = "O campo 'Tipo' não pode estar em branco.")
        MedicationType type,
        @NotBlank(message = "O campo 'Dose' não pode estar em branco.")
        String dose,
        @NotNull(message = "O campo 'Quantidade' não pode estar em branco.")
        Double amount,
        @NotNull(message = "O campo 'Unidade' não pode estar em branco.")
        MedicationUnity unity,
        @NotNull(message = "Defina o período inicial da medicação.")
        int period,
        boolean isContinuousUse,
        @NotNull(message = "Informe a data de inicio.")
        Date start_date,
        @NotNull(message = "Informe a data final.")
        Date end_date,
        @NotNull(message = "Informe a data da primeira dose.")
        Date first_dose,
        OphthalmicDetails ophthalmicDetails
) {
}
