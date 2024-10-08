package com.medicamentar.medicamentar_api.application.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.eventDto.EventResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
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

    public ServiceResponse<EventResponse> getEvents() {
        // Page<Consultation> consultations =
        // consultationRepository.findAll(PageRequest.of(page, size));
        ServiceResponse<EventResponse> response = new ServiceResponse<EventResponse>();

        var allMedications = this.medicationRepository.findAll();

        var allExams = this.examRepository.findAll();

        var allConsultations = this.consultationRepository.findAll();

        List<MedicationResponse> medicationsResponses = allMedications.stream()
                .map(m -> new MedicationResponse(
                        m.getId(),
                        m.getName(),
                        m.getType(),
                        m.getDose(),
                        m.getAmount(),
                        m.getUnity(),
                        m.getPeriod(),
                        m.getValidate()

                ))
                .collect(Collectors.toList());

        List<ExamResponse> examsResponses = allExams.stream()
                .map(E -> new ExamResponse(
                        E.getDate(),
                        E.getName(),
                        E.getLocal(),
                        E.getDescription()

                ))
                .collect(Collectors.toList());

        List<ConsultationResponse> consultationsResponses = allConsultations.stream()
                .map(c -> new ConsultationResponse(
                        c.getId(),
                        c.getDate(),
                        c.getDoctorName(),
                        c.getLocal(),
                        c.getDescription()))
                .collect(Collectors.toList());

        EventResponse eventResponse = new EventResponse(medicationsResponses, consultationsResponses, examsResponses);

        response.setData(eventResponse);
        response.setMessage("Ok");
        response.setStatus(HttpStatus.ACCEPTED);

        return response;
    }
}
