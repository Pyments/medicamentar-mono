package com.medicamentar.medicamentar_api.application.dtos.MedicationDto;
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