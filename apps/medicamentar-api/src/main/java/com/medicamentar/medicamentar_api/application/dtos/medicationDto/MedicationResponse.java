package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import java.util.UUID;

import com.medicamentar.medicamentar_api.domain.entities.OphthalmicDetails;
import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.enums.MedicationUnity;

import java.util.Date;

public record MedicationResponse (
    UUID id,
    String name,
    MedicationType type,
    String dose,
    Double amount,
    MedicationUnity unity,
    int period,
    boolean continuousUse,
    Date startDate,
    Date endDate,
    Date firstDose,
    OphthalmicDetails ophthalmicDetails
)
{}
