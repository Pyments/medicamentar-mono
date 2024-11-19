package com.medicamentar.medicamentar_api.application.services;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.eventDto.EventResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.PaginatedResponse;
import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.entities.Exam;
import com.medicamentar.medicamentar_api.domain.entities.Medication;
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
            response.setMessage("O número de páginas não pdoe ser negativo.");
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

            Page<Medication> pagedMedications = medicationRepository.findByUser(currentUser, pageable);
            Page<Exam> pagedExams = examRepository.findByUser(currentUser, pageable);
            Page<Consultation> pagedConsultations = consultationRepository.findByUser(currentUser, pageable);

            List<MedicationResponse> medicationsResponses = pagedMedications.stream()
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
                            medication.getType() == MedicationType.OFTALMICO ? medication.getOphthalmicDetails() : null))
                            .collect(Collectors.toList());

            List<ExamResponse> examsResponses = pagedExams.stream()
                    .map(E -> new ExamResponse(
                            E.getId(),
                            E.getDate(),
                            E.getName(),
                            E.getLocal(),
                            E.getDescription()))
                    .sorted(Comparator.comparing(ExamResponse::date))
                    .collect(Collectors.toList());

            List<ConsultationResponse> consultationsResponses = pagedConsultations.stream()
                    .map(C -> new ConsultationResponse(
                            C.getId(),
                            C.getDate(),
                            C.getDoctorName(),
                            C.getLocal(),
                            C.getDescription()))
                    .sorted(Comparator.comparing(ConsultationResponse::date))
                    .collect(Collectors.toList());

            if (medicationsResponses.isEmpty() && examsResponses.isEmpty() && consultationsResponses.isEmpty()) {
                response.setMessage("Nehnum evento encontrado.");
                response.setStatus(HttpStatus.NOT_FOUND);
                return response;
            }

            EventResponse eventResponse = new EventResponse(medicationsResponses, consultationsResponses,
                    examsResponses);

            response.setData(eventResponse);
            response.setMessage("Exibindo eventos.");
            response.setStatus(HttpStatus.OK);
            response.setGetTotalPages(pagedMedications.getTotalPages());
            response.setGetTotalElements(pagedMedications.getTotalElements());

        } catch (Exception e) {
            response.setMessage("Ocorreu um erro ao tentar mostrar os eventos: " + e.getMessage());
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
}
