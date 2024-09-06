package com.medicamentar.medicamentar_api.application.dtos.ConsultationDto;
import java.util.UUID;
import java.util.Date;
  

public record ConsultationResponse (
    UUID id,
    Date date,
    String doctorName,
    String local,
    String description
)
{}
