package com.medicamentar.medicamentar_api.application.dtos.examDto;


import java.util.Date;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record  ExamResponse (
    UUID id,
    @NotNull(message= "Id can't be blank")
    Date date,
    @NotBlank(message = "Name can't be blank")
    String name,
    @NotBlank(message= "local can't be blank")
    String local,
    String description
)
{}
