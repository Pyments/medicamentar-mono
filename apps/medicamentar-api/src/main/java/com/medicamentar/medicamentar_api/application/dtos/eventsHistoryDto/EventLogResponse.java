package com.medicamentar.medicamentar_api.application.dtos.eventsHistoryDto;

import java.time.ZonedDateTime;

public record EventLogResponse<TEntity>(
  TEntity eventData,
  String eventAction,
  ZonedDateTime eventDate
) { }
