package com.medicamentar.medicamentar_api.application.services;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.eventDto.EventResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;
import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.repositories.ConsultationRepository;
import com.medicamentar.medicamentar_api.domain.repositories.ExamRepository;
import com.medicamentar.medicamentar_api.domain.repositories.MedicationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EventService {

    private final ConsultationRepository consultationRepository;
    private final  ExamRepository examRepository;
    private final MedicationRepository medicationRepository;

    public EventResponse getEvents(int page, int size){
        Page<Consultation> consultations = consultationRepository.findAll(PageRequest.of(page, size));

        var allMedications = medicationRepository.findAll();

        var allExams = examRepository.findAll();

        var allConsultations = consultationRepository.findAll();

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
                c.getDescription()
            ))
            .collect(Collectors.toList());

            MedicationResponse medicationResponse = new MedicationResponse(medicationsResponses);
            ConsultationResponse consultationResponse = new ConsultationResponse(consultationsResponses);
            ExamResponse examResponse = new ExamResponse(examsResponses);

        EventResponse eventResponse = new EventResponse(medicationResponse, consultationResponse, examResponse);

        return eventResponse;
    }
}
