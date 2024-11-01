package com.medicamentar.medicamentar_api.application.services;

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
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.entities.Exam;
import com.medicamentar.medicamentar_api.domain.entities.Medication;
import com.medicamentar.medicamentar_api.domain.repositories.ConsultationRepository;
import com.medicamentar.medicamentar_api.domain.repositories.ExamRepository;
import com.medicamentar.medicamentar_api.domain.repositories.MedicationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EventService {

    private final ConsultationRepository consultationRepository;
    private final ExamRepository examRepository;
    private final MedicationRepository medicationRepository;

    public ServiceResponse<EventResponse> getEvents(int page, int size) {
        ServiceResponse<EventResponse> response = new ServiceResponse<>();

        if (page < 0) {
            response.setMessage("Page number must be non-negative.");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }
        if (size <= 0) {
            response.setMessage("Page size must be greater than zero.");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }

        try {
            Pageable pageable = PageRequest.of(page, size);

            Page<Medication> pagedMedications = this.medicationRepository.findAll(pageable);
            Page<Exam> pagedExams = this.examRepository.findAll(pageable);
            Page<Consultation> pagedConsultations = this.consultationRepository.findAll(pageable);

            List<MedicationResponse> medicationsResponses = pagedMedications.stream()
                    .map(M -> new MedicationResponse(
                            M.getId(),
                            M.getName(),
                            M.getType(),
                            M.getDose(),
                            M.getAmount(),
                            M.getUnity(),
                            M.getPeriod(),
                            M.getValidate()
                    ))
                    .collect(Collectors.toList());

            List<ExamResponse> examsResponses = pagedExams.stream()
                    .map(E -> new ExamResponse(
                            E.getId(),
                            E.getDate(),
                            E.getName(),
                            E.getLocal(),
                            E.getDescription()
                    ))
                    .collect(Collectors.toList());

            List<ConsultationResponse> consultationsResponses = pagedConsultations.stream()
                    .map(C -> new ConsultationResponse(
                            C.getId(),
                            C.getDate(),
                            C.getDoctorName(),
                            C.getLocal(),
                            C.getDescription()))
                    .collect(Collectors.toList());

            if (medicationsResponses.isEmpty() && examsResponses.isEmpty() && consultationsResponses.isEmpty()) {
                response.setMessage("No events found.");
                response.setStatus(HttpStatus.NOT_FOUND); 
                return response;
            }

            EventResponse eventResponse = new EventResponse(medicationsResponses, consultationsResponses, examsResponses);

            response.setData(eventResponse);
            response.setMessage("Events retrieved successfully.");
            response.setStatus(HttpStatus.OK);
            response.setGetTotalPages(pagedMedications.getTotalPages());
            response.setGetTotalElements(pagedMedications.getTotalElements());

        } catch (Exception e) {
            response.setMessage("An error occurred while retrieving events: " + e.getMessage());
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
}
