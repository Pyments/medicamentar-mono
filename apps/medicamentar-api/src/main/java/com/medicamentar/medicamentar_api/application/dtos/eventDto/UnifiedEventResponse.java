package com.medicamentar.medicamentar_api.application.dtos.eventDto;

import java.time.ZonedDateTime;
import java.util.UUID;

public record UnifiedEventResponse(
    UUID id,
    String name,
    String type,
    ZonedDateTime date,
    String description,
    boolean isCompleted,
    Object details
) {}
