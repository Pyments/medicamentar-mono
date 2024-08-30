package com.medicamentar.medicamentar_api.application.dtos.MedicationDto;
import java.util.UUID;
import java.util.Date;

public record MedicationResponse (
    UUID id,
    String name,
    String type,
    String dose,
    Double amount,
    String unity,
    Date period,
    Date validate
)
{}
