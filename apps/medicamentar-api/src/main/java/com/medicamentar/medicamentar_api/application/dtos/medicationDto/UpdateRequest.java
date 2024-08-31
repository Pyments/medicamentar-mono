package com.medicamentar.medicamentar_api.application.dtos.medicationDto;
import java.util.Date;

public record UpdateRequest (
    String name,
    String dose,
    Double amount,
    Date period,
    Date validate
) {}
