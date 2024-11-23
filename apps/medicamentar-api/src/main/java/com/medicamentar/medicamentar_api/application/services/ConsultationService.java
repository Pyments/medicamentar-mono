package com.medicamentar.medicamentar_api.application.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationRequest;
import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;
import com.medicamentar.medicamentar_api.domain.repositories.ConsultationRepository;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepo;
    private final EventLogService eLogService;
    private final TokenService tokenService;
    public ServiceResponse<String> createConsultation(ConsultationRequest consultationRegister) {
        ServiceResponse<String> response = new ServiceResponse<String>();
        User currentUser = tokenService.getCurrentUser();

        var consultation = new Consultation();
        consultation.setDate(consultationRegister.date());
        consultation.setDoctorName(consultationRegister.doctorName());
        consultation.setLocal(consultationRegister.local());
        consultation.setDescription(consultationRegister.description());
        consultation.setUser(currentUser);
        this.consultationRepo.save(consultation);
        this.eLogService.saveEvent(EventLogAction.Criado, consultation);

        response.setMessage("consulta agendada com sucesso!");
        response.setStatus(HttpStatus.CREATED);
        return response;
    }

    public ServiceResponse<List<ConsultationResponse>> getConsultations() {
        ServiceResponse<List<ConsultationResponse>> response = new ServiceResponse<>();
        User currentUser = tokenService.getCurrentUser();

        List<Consultation> consultations = this.consultationRepo.findByUserAndDeletedAtIsNull(currentUser);

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
        User currentUser = tokenService.getCurrentUser();

        var consultationId = UUID.fromString(id);
        var consultation = consultationRepo.findByIdAndUserAndDeletedAtIsNull(consultationId, currentUser);

        if (consultation.isPresent()) {
            Consultation cons = consultation.get();
            cons.setDeletedAt(LocalDateTime.now());
            consultationRepo.save(cons);
            this.eLogService.saveEvent(EventLogAction.Deletado, cons);

            response.setMessage("Consulta removida com sucesso!");
            response.setStatus(HttpStatus.ACCEPTED);
        } else {
            response.setMessage("Consulta não encontrada!");
            response.setStatus(HttpStatus.NOT_FOUND);
        }

        return response;
    }

}
