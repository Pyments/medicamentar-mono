package com.medicamentar.medicamentar_api.application.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.eventDto.EventResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.PaginatedResponse;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.repositories.ConsultationRepository;
import com.medicamentar.medicamentar_api.domain.repositories.ExamRepository;
import com.medicamentar.medicamentar_api.domain.repositories.MedicationRepository;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EventService {

    private final ConsultationRepository consultationRepository;
    private final ExamRepository examRepository;
    private final MedicationRepository medicationRepository;
    private final TokenService tokenService;
    public PaginatedResponse<EventResponse> getEvents(int page, int size) {
        var response = new PaginatedResponse<EventResponse>();
        User currentUser = tokenService.getCurrentUser();

        if (page < 0) {
            response.setMessage("O número de páginas não pode ser negativo.");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }
        if (size <= 0) {
            response.setMessage("O tamanho da página deve ser maior que zero.");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }

        try {
            Pageable pageable = PageRequest.of(page, size);
            
            var medications = medicationRepository.findByUserAndDeletedAtIsNull(currentUser, null);
            var exams = examRepository.findByUserAndDeletedAtIsNull(currentUser, null);
            var consultations = consultationRepository.findByUserAndDeletedAtIsNull(currentUser, null);

            List<MedicationResponse> medicationsResponses = medications.stream()
                    .map(medication -> new MedicationResponse(
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
                            medication.isCompleted(),
                            medication.getType() == MedicationType.OFTALMICO ? medication.getOphthalmicDetails() : null))
                    .collect(Collectors.toList());

            List<ExamResponse> examsResponses = exams.stream()
                    .map(E -> new ExamResponse(
                            E.getId(),
                            E.getDate(),
                            E.getName(),
                            E.getLocal(),
                            E.getDescription(),
                            E.isCompleted()))
                    .collect(Collectors.toList());

            List<ConsultationResponse> consultationsResponses = consultations.stream()
                    .map(C -> new ConsultationResponse(
                            C.getId(),
                            C.getDate(),
                            C.getDoctorName(),
                            C.getLocal(),
                            C.getDescription(),
                            C.isCompleted()))
                    .collect(Collectors.toList());

            List<Object> allEvents = new ArrayList<>();
            allEvents.addAll(medicationsResponses);
            allEvents.addAll(examsResponses);
            allEvents.addAll(consultationsResponses);

            allEvents.sort((a, b) -> {
                ZonedDateTime dateA = getEventDate(a);
                ZonedDateTime dateB = getEventDate(b);
                return dateB.compareTo(dateA); 
            });

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), allEvents.size());
            List<Object> pagedEvents = allEvents.subList(start, end);

            List<MedicationResponse> pagedMedications = pagedEvents.stream()
                    .filter(e -> e instanceof MedicationResponse)
                    .map(e -> (MedicationResponse) e)
                    .collect(Collectors.toList());

            List<ExamResponse> pagedExams = pagedEvents.stream()
                    .filter(e -> e instanceof ExamResponse)
                    .map(e -> (ExamResponse) e)
                    .collect(Collectors.toList());

            List<ConsultationResponse> pagedConsultations = pagedEvents.stream()
                    .filter(e -> e instanceof ConsultationResponse)
                    .map(e -> (ConsultationResponse) e)
                    .collect(Collectors.toList());

            EventResponse eventResponse = new EventResponse(pagedMedications, pagedConsultations, pagedExams);

            response.setData(eventResponse);
            response.setMessage("Exibindo eventos.");
            response.setStatus(HttpStatus.OK);
            response.setTotalPages((int) Math.ceil((double) allEvents.size() / size));
            response.setTotalElements((long) allEvents.size());

        } catch (Exception e) {
            response.setMessage("Ocorreu um erro ao tentar mostrar os eventos: " + e.getMessage());
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    private ZonedDateTime getEventDate(Object event) {
        if (event instanceof MedicationResponse) {
            return ((MedicationResponse) event).startDate();
        } else if (event instanceof ExamResponse) {
            return ((ExamResponse) event).date();
        } else if (event instanceof ConsultationResponse) {
            return ((ConsultationResponse) event).date();
        }
        return ZonedDateTime.of(1970, 1, 1, 0, 0, 0, 0, ZoneId.systemDefault()); // Fallback to Unix epoch
    }
}
