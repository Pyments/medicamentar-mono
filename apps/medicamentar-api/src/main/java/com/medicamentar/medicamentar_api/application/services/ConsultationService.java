package com.medicamentar.medicamentar_api.application.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationRequest;
import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.repositories.ConsultationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepo;

    public ServiceResponse<String> createConsultation(ConsultationRequest consultationRegister){
        ServiceResponse<String> response = new ServiceResponse<String>();

        var consultation = new Consultation();
        consultation.setDate(consultationRegister.date());
        consultation.setDoctorName(consultationRegister.doctorName());
        consultation.setLocal(consultationRegister.local());
        consultation.setDescription(consultationRegister.description());

        this.consultationRepo.save(consultation);

        response.setMessage("appointment successfully scheduled!");
        response.setStatus(HttpStatus.CREATED);
        return response;
    }

    public ServiceResponse<List<ConsultationResponse>> getConsultations(){
        ServiceResponse<List<ConsultationResponse>> response = new ServiceResponse<>();

        List<Consultation> consultations = this.consultationRepo.findAll();

        List<ConsultationResponse> consultationResponses = consultations.stream()
            .map(consultation -> new ConsultationResponse(
                consultation.getId(),
                consultation.getDate(),
                consultation.getDoctorName(),
                consultation.getLocal(),
                consultation.getDescription()
            ))
            .collect(Collectors.toList());

        response.setData(consultationResponses);
        response.setStatus(HttpStatus.ACCEPTED);
        response.setMessage("appointments retrieved successfully.");

        return response;
    }

    public ServiceResponse<String> deleteConsultation(String id){
        ServiceResponse<String> response = new ServiceResponse<>();

        var consultationId = UUID.fromString(id);
        var consultationExists = consultationRepo.existsById(consultationId);

        if (consultationExists) {
            consultationRepo.deleteById(consultationId);
            response.setMessage("consultation successfully removed.");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Consultation not found!");
            response.setStatus(HttpStatus.NOT_FOUND);
        }

        return response;
    }
    
}
