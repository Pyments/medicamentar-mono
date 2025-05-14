package com.medicamentar.medicamentar_api.application.dtos.consultationExamDto;

import java.time.ZonedDateTime;
import java.util.UUID;

public record UnifiedConsultationExamResponse(
    UUID id,
    String name,
    String type,
    ZonedDateTime date,
    String local,
    String description,
    boolean isCompleted
) {}
