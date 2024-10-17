package com.medicamentar.medicamentar_api.application.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.eventsHistoryDto.EventLogResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.EventLog;
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;
import com.medicamentar.medicamentar_api.domain.repositories.EventLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventLogService {
  private final EventLogRepository eventLogRepository;

  /**
   * Saves an event log entry in the database.
   *
   * @param <TEntity>   The type of the event entity, restricted to entities.
   * @param eventAction The action of the event (e.g., creation, update,
   *                    deletion).
   * @param eventType   The specific type of the event entity, which must be an
   *                    entity.
   * @param eventDate   The date and time when the event occurred.
   */
  public <TEntity> void saveEvent(EventLogAction eventAction, TEntity eventType) {

    var eventLog = new EventLog();
    String translatedName = entityTranslations.getOrDefault(eventType.getClass().getSimpleName(), eventType.getClass().getSimpleName());

    eventLog.setEventAction(eventAction);
    eventLog.setEventType(translatedName);

    this.eventLogRepository.save(eventLog);
  }

  public ServiceResponse<List<EventLogResponse>> getHistory() {
    var response = new ServiceResponse<List<EventLogResponse>>();

    var history = this.eventLogRepository.findAll();

    var eventLogResponse = history.stream()
        .map(h -> new EventLogResponse(h.getEventAction(), h.getEventType(), h.getEventDate()))
        .collect(Collectors.toList());

    response.setData(eventLogResponse);
    response.setStatus(HttpStatus.OK);
    response.setMessage("Successfully returned history");
    return response;
  }

  private static final Map<String, String> entityTranslations = Map.of(
      "Medication", "Medicamento",
      "Exam", "Exame",
      "Consultation", "Consulta"
  );

}