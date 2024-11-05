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
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;
import com.medicamentar.medicamentar_api.domain.repositories.ConsultationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepo;
    private final EventLogService eLogService;

    public ServiceResponse<String> createConsultation(ConsultationRequest consultationRegister) {
        ServiceResponse<String> response = new ServiceResponse<String>();

        var consultation = new Consultation();
        consultation.setDate(consultationRegister.date());
        consultation.setDoctorName(consultationRegister.doctorName());
        consultation.setLocal(consultationRegister.local());
        consultation.setDescription(consultationRegister.description());

        this.consultationRepo.save(consultation);
        this.eLogService.saveEvent(EventLogAction.Criado, consultation);

        response.setMessage("consulta agendada com sucesso!");
        response.setStatus(HttpStatus.CREATED);
        return response;
    }

    public ServiceResponse<List<ConsultationResponse>> getConsultations() {
        ServiceResponse<List<ConsultationResponse>> response = new ServiceResponse<>();

        List<Consultation> consultations = this.consultationRepo.findAll();

        List<ConsultationResponse> consultationResponses = consultations.stream()
                .map(consultation -> new ConsultationResponse(
                        consultation.getId(),
                        consultation.getDate(),
                        consultation.getDoctorName(),
                        consultation.getLocal(),
                        consultation.getDescription()))
                .collect(Collectors.toList());

        response.setData(consultationResponses);
        response.setStatus(HttpStatus.ACCEPTED);
        response.setMessage("Exibindo consultas.");

        return response;
    }

    public ServiceResponse<String> deleteConsultation(String id) {
        ServiceResponse<String> response = new ServiceResponse<>();

        var consultationId = UUID.fromString(id);
        var consultation = consultationRepo.findById(consultationId);

        if (consultation.isPresent()) {
            consultationRepo.deleteById(consultationId);
            this.eLogService.saveEvent(EventLogAction.Deletado, consultation.get());

            response.setMessage("Consulta removida com sucesso!");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Consulta não encontrada!");
            response.setStatus(HttpStatus.NOT_FOUND);
        }

        return response;
    }

}
