package com.medicamentar.medicamentar_api.application.services;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.eventsHistoryDto.EventLogResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.PaginatedResponse;
import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.entities.EventLog;
import com.medicamentar.medicamentar_api.domain.entities.Exam;
import com.medicamentar.medicamentar_api.domain.entities.Medication;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;
import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.repositories.ConsultationRepository;
import com.medicamentar.medicamentar_api.domain.repositories.EventLogRepository;
import com.medicamentar.medicamentar_api.domain.repositories.ExamRepository;
import com.medicamentar.medicamentar_api.domain.repositories.MedicationRepository;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventLogService {
  private final EventLogRepository eventLogRepository;
  private final MedicationRepository medicationRepository;
  private final ExamRepository examRepository;
  private final ConsultationRepository consultationRepository;
  private final TokenService tokenService;

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
    String translatedName = entityTranslations.getOrDefault(eventType.getClass().getSimpleName(),
        eventType.getClass().getSimpleName());

    try {
      Field idField = eventType.getClass().getDeclaredField("id");
      idField.setAccessible(true);

      Object idValue = idField.get(eventType);

      if (idValue instanceof UUID) {
        UUID eventReferenceId = (UUID) idValue;
        eventLog.setEventReferenceId(eventReferenceId);
        eventLog.setEventAction(String.format("%s %s", translatedName, eventAction));
        eventLog.setEventType(translatedName);
        eventLog.setUser(tokenService.getCurrentUser());

        this.eventLogRepository.save(eventLog);
      } else {
        throw new IllegalArgumentException("Não foi possível salvar o evento no histórico.");
      }

    } catch (NoSuchFieldException e) {
      e.printStackTrace();
      throw new IllegalArgumentException("A entidade não possui um campo 'id' acessível.", e);
    } catch (IllegalAccessException e) {
      e.printStackTrace();
      throw new IllegalArgumentException("Não foi possível acessar o campo 'id'.", e);
    } catch (IllegalArgumentException e) {
      e.printStackTrace();
      throw new IllegalArgumentException("Erro na conversão para UUID: " + e.getMessage(), e);
    }
  }

  public PaginatedResponse<List<EventLogResponse>> getHistory(int page, int size) {
    var response = new PaginatedResponse<List<EventLogResponse>>();
    User currentUser = tokenService.getCurrentUser();

    Pageable pageable = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("eventDate").descending());

    var history = eventLogRepository.findByUser(currentUser, pageable);

    var eventLogResponse = history.getContent().stream()
        .map(h -> {
            switch (h.getEventType()) {
                case "Medicamento":
                    Optional<Medication> optionalMedication = medicationRepository.findById(h.getEventReferenceId());
                    MedicationResponse medicationResponse = optionalMedication.map(medication -> new MedicationResponse(
                        medication.getId(),
                        medication.getName(),
                        medication.getType(),
                        medication.getDose(),
                        medication.getAmount(),
                        medication.getUnity(),
                        medication.getPeriod(),
                        medication.isContinuousUse(),
                        medication.getStart_date(),
                        medication.getEnd_date(),
                        medication.getType() == MedicationType.OFTALMICO ? medication.getOphthalmicDetails() : null))
                        .orElse(null);

                    return new EventLogResponse(h.getId(), medicationResponse, h.getEventAction(), h.getEventDate());

                case "Exame":
                    Optional<Exam> optionalExam = examRepository.findById(h.getEventReferenceId());
                    ExamResponse examResponse = optionalExam.map(exam -> new ExamResponse(
                        exam.getId(),
                        exam.getDate(),
                        exam.getName(),
                        exam.getLocal(),
                        exam.getDescription(),
                        exam.isCompleted())).orElse(null);

                    return new EventLogResponse(h.getId(), examResponse, h.getEventAction(), h.getEventDate());

                case "Consulta":
                    Optional<Consultation> optionalConsultation = consultationRepository.findById(h.getEventReferenceId());
                    ConsultationResponse consultationResponse = optionalConsultation
                        .map(consultation -> new ConsultationResponse(
                            consultation.getId(),
                            consultation.getDate(),
                            consultation.getDoctorName(),
                            consultation.getLocal(),
                            consultation.getDescription(),
                            consultation.isCompleted()))
                        .orElse(null);

                    return new EventLogResponse(h.getId(), consultationResponse, h.getEventAction(), h.getEventDate());

                default:
                    return null;
            }
        })
        .filter(eventLogResponseItem -> eventLogResponseItem != null)
        .collect(Collectors.toList());

    response.setData(eventLogResponse);
    response.setStatus(HttpStatus.OK);
    response.setMessage("Successfully returned history");
    response.setTotalPages(history.getTotalPages());
    response.setTotalElements(history.getTotalElements());
    return response;
}

  private static final Map<String, String> entityTranslations = Map.of(
      "Medication", "Medicamento",
      "Exam", "Exame",
      "Consultation", "Consulta");

}