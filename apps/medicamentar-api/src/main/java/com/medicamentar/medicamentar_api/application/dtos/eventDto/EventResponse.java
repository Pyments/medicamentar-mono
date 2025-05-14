package com.medicamentar.medicamentar_api.application.dtos.eventDto;

import java.util.List;

public record EventResponse(
    List<UnifiedEventResponse> events
) {}
