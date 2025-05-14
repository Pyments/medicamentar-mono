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
import com.medicamentar.medicamentar_api.application.dtos.eventDto.UnifiedEventResponse;
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
                            medication.getNextDose(),
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

            List<UnifiedEventResponse> allEvents = new ArrayList<>();
            ZonedDateTime now = ZonedDateTime.now();
            
            // Converter medicamentos
            medicationsResponses.forEach(med -> {
                if (!med.isCompleted()) {
                    ZonedDateTime eventDate = med.nextDose();
                    // Se nextDose for nulo, usa startDate
                    if (eventDate == null) {
                        eventDate = med.startDate();
                    }
                    // Só adiciona se tiver uma data válida
                    if (eventDate != null) {
                        allEvents.add(new UnifiedEventResponse(
                            med.id(),
                            med.name(),
                            "MEDICATION",
                            eventDate,
                            "Dose: " + med.dose() + " " + med.unity(),
                            med.isCompleted(),
                            med
                        ));
                    }
                }
            });

            examsResponses.forEach(exam -> {
                ZonedDateTime examDate = exam.date();
                if (!exam.isCompleted() && examDate != null && examDate.isAfter(now)) {
                    allEvents.add(new UnifiedEventResponse(
                        exam.id(),
                        exam.name(),
                        "EXAM",
                        examDate,
                        exam.description(),
                        exam.isCompleted(),
                        exam
                    ));
                }
            });

            consultationsResponses.forEach(cons -> {
                ZonedDateTime consultationDate = cons.date();
                if (!cons.isCompleted() && consultationDate != null && consultationDate.isAfter(now)) {
                    allEvents.add(new UnifiedEventResponse(
                        cons.id(),
                        cons.doctorName(),
                        "CONSULTATION",
                        consultationDate,
                        cons.description(),
                        cons.isCompleted(),
                        cons
                    ));
                }
            });

            allEvents.sort((a, b) -> {
                if (a.date() == null && b.date() == null) return 0;
                if (a.date() == null) return 1;
                if (b.date() == null) return -1;
                return a.date().compareTo(b.date());
            });

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), allEvents.size());
            List<UnifiedEventResponse> pagedEvents = allEvents.subList(start, end);

            EventResponse eventResponse = new EventResponse(pagedEvents);

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
}
