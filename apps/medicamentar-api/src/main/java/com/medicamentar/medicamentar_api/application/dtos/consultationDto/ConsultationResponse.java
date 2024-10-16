package com.medicamentar.medicamentar_api.application.dtos.consultationDto;
import java.util.Date;
import java.util.UUID;
  

public record ConsultationResponse (
    UUID id,
    Date date,
    String doctorName,
    String local,
    String description
)
{}
