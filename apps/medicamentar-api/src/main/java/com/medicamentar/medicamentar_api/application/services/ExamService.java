package com.medicamentar.medicamentar_api.application.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamRequest;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.Exam;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.enums.EventLogAction;
import com.medicamentar.medicamentar_api.domain.repositories.ExamRepository;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository repository;
    private final EventLogService eLogService;
    private final TokenService tokenService;
    
    public ServiceResponse<List<ExamResponse>> getAllexams(int page, int size) {
        var response = new ServiceResponse<List<ExamResponse>>();
        User currentUser = tokenService.getCurrentUser();

        Pageable pageable = PageRequest.of(page, size);

        Page<Exam> examsPage = repository.findByUser(currentUser, pageable);

        List<ExamResponse> examsResponses = examsPage.getContent().stream()
                .map(exam -> new ExamResponse(
                        exam.getId(),
                        exam.getDate(),
                        exam.getName(),
                        exam.getLocal(),
                        exam.getDescription()))
                .collect(Collectors.toList());

        response.setData(examsResponses);
        response.setStatus(HttpStatus.ACCEPTED);
        response.setMessage(String.format("Exibindo página %d de %d.", examsPage.getNumber() + 1, examsPage.getTotalPages()));

        return response;
    }

    public ServiceResponse<ExamResponse> updateExam(UUID examId, ExamRequest examRequest) {
        ServiceResponse<ExamResponse> response = new ServiceResponse<>();
        User currentUser = tokenService.getCurrentUser();

        Optional<Exam> examOptional = repository.findByIdAndUser(examId, currentUser);
        if (!examOptional.isPresent()) {
            response.setMessage("Exame não encontrado ou sem permissão.");
            response.setStatus(HttpStatus.FORBIDDEN);
            return response;
        }

        Exam exam = examOptional.get();
        exam.setDate(examRequest.date());
        exam.setName(examRequest.name());
        exam.setLocal(examRequest.local());
        exam.setDescription(examRequest.description());
        this.repository.save(exam);

        var examResponse = new ExamResponse(
                exam.getId(),
                exam.getDate(),
                exam.getName(),
                exam.getLocal(),
                exam.getDescription());

        this.eLogService.saveEvent(EventLogAction.Atualizado, exam);
        response.setData(examResponse);
        response.setMessage("Exame atualizado com sucesso!");
        response.setStatus(HttpStatus.ACCEPTED);

        return response;
    }

    public ServiceResponse<ExamResponse> registerExam(ExamRequest data) {
        ServiceResponse<ExamResponse> response = new ServiceResponse<>();
        User currentUser = tokenService.getCurrentUser();

        if (data == null) {
            response.setMessage("Não foi possível registrar o exame.");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }

        Exam newExam = new Exam();
        newExam.setDate(data.date());
        newExam.setName(data.name());
        newExam.setLocal(data.local());
        newExam.setDescription(data.description());
        newExam.setUser(currentUser);

        Exam savedExam = this.repository.save(newExam);

        var examResponse = new ExamResponse(
                savedExam.getId(),
                savedExam.getDate(),
                savedExam.getName(),
                savedExam.getLocal(),
                savedExam.getDescription());

        response.setData(examResponse);
        response.setMessage("Exame registrado com sucesso!");
        response.setStatus(HttpStatus.CREATED);

        this.eLogService.saveEvent(EventLogAction.Criado, newExam);

        return response;
    }

    public ServiceResponse<String> deleteExam(UUID id) {
        ServiceResponse<String> response = new ServiceResponse<>();
        User currentUser = tokenService.getCurrentUser();

        Optional<Exam> examOptional = repository.findByIdAndUser(id, currentUser);
        if (!examOptional.isPresent()) {
            response.setMessage("Exame não encontrado ou sem permissão.");
            response.setStatus(HttpStatus.FORBIDDEN);
            return response;
        }

        this.repository.deleteById(id);
        response.setMessage("Exame deletado com sucesso!");
        response.setStatus(HttpStatus.ACCEPTED);
        this.eLogService.saveEvent(EventLogAction.Deletado, examOptional.get());

        return response;
    }
}
