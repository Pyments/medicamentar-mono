package com.medicamentar.medicamentar_api.application.dtos.MedicationDto;
import java.util.Date;

public record UpdateRequest (
    String name,
    String dose,
    Double amount,
    Date period,
    Date validate
) {}
