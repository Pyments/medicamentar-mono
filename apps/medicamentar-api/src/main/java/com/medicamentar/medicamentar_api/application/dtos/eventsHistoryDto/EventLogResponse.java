package com.medicamentar.medicamentar_api.application.dtos.eventsHistoryDto;

import java.time.ZonedDateTime;
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;

public record EventLogResponse(
  EventLogAction eventAction,
  String eventType,
  ZonedDateTime eventDate
) { }
