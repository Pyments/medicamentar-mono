package com.medicamentar.medicamentar_api.application.dtos.consultationDto;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;
import java.util.Date;
  

public record ConsultationResponse (
    UUID id,
    @NotBlank(message = "Date can't be blank")
    Date date,
    @NotBlank(message = "Name can't be blank")
    String doctorName,
    @NotBlank(message = "local can't be blank")
    String local,
    String description
)
{}
