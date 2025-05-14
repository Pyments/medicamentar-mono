package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import java.time.ZonedDateTime;
import java.util.UUID;

import com.medicamentar.medicamentar_api.domain.entities.OphthalmicDetails;
import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.enums.MedicationUnity;

public record MedicationResponse (
    UUID id,
    String name,
    MedicationType type,
    Integer dose,
    Double amount,
    MedicationUnity unity,
    int period,
    boolean continuousUse,
    ZonedDateTime startDate,
    ZonedDateTime endDate,
    ZonedDateTime nextDose,
    boolean isCompleted,
    OphthalmicDetails ophthalmicDetails
)
{}
