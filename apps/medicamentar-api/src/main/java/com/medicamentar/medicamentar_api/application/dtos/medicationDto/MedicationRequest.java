package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import java.util.Date;

public record MedicationRequest (
    String name,
    String type,
    String dose,
    Double amount,
    String unity,
    Date period,
    Date validate
) {}