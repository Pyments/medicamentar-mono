package com.medicamentar.medicamentar_api.application.dtos.examDto;


import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record  ExamResponse (
    UUID id,
    @NotNull(message= "Id can't be blank")
    ZonedDateTime date,
    @NotBlank(message = "Name can't be blank")
    String name,
    @NotBlank(message= "local can't be blank")
    String local,
    String description
)
{}
