package com.medicamentar.medicamentar_api.application.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationRequest;
import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.PaginatedResponse;
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
        var response = new ServiceResponse<String>();
        User currentUser = tokenService.getCurrentUser();

        var consultation = new Consultation();
        consultation.setDate(consultationRegister.date());
        consultation.setDoctorName(consultationRegister.doctorName());
        consultation.setLocal(consultationRegister.local());
        consultation.setDescription(consultationRegister.description());
        consultation.setUser(currentUser);
        this.consultationRepo.save(consultation);
        this.eLogService.saveEvent(EventLogAction.Criado, consultation);

        response.setMessage("Consulta agendada com sucesso!");
        response.setStatus(HttpStatus.CREATED);
        return response;
    }

    public PaginatedResponse<List<ConsultationResponse>> getConsultations(int page, int size) {
        PaginatedResponse<List<ConsultationResponse>> response = new PaginatedResponse<>();
        User currentUser = tokenService.getCurrentUser();

        Page<Consultation> consultations = this.consultationRepo.findByUserAndDeletedAtIsNull(
                currentUser, PageRequest.of(page, size));

        List<ConsultationResponse> consultationResponses = consultations.getContent().stream()
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
        response.setTotalPages(consultations.getTotalPages());
        response.setTotalElements(consultations.getTotalElements());
        return response;
    }

    public ServiceResponse<String> deleteConsultation(String id) {
        var response = new ServiceResponse<String>();
        User currentUser = tokenService.getCurrentUser();

        UUID consultationId;
        try {
            consultationId = UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            response.setMessage("ID inválido.");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }

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
