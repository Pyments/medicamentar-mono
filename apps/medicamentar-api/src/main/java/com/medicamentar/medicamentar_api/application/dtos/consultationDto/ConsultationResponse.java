package com.medicamentar.medicamentar_api.application.dtos.consultationDto;
import java.time.ZonedDateTime;
import java.util.UUID;
  

public record ConsultationResponse (
    UUID id,
    ZonedDateTime date,
    String doctorName,
    String local,
    String description,
    boolean completed
)
{}