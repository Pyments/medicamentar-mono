package com.medicamentar.medicamentar_api.application.dtos.eventsHistoryDto;

import java.time.ZonedDateTime;
import java.util.UUID;
public record EventLogResponse<TEntity>(
  UUID id,
  TEntity eventData,
  String eventAction,
  ZonedDateTime eventDate
) { }
