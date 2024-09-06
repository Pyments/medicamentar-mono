package com.medicamentar.medicamentar_api.application.dtos.consultationDto;
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
