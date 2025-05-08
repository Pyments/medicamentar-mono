package com.medicamentar.medicamentar_api.application.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.consultationExamDto.ConsultationsExamsResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.PaginatedResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConsultationsExamsService {
    private final ConsultationService consultationService;
    private final ExamService examService;

    public PaginatedResponse<ConsultationsExamsResponse> getConsultationsAndExams(int page, int size) {
        PaginatedResponse<List<ConsultationResponse>> consultationsResponse = consultationService.getConsultations(page, size);
        PaginatedResponse<List<ExamResponse>> examsResponse = examService.getAllexams(page, size);

        ConsultationsExamsResponse combinedData = new ConsultationsExamsResponse(
            consultationsResponse.getData(),
            examsResponse.getData());

        HttpStatus status = (consultationsResponse.getStatus().isError() || examsResponse.getStatus().isError())
                ? HttpStatus.PARTIAL_CONTENT
                : HttpStatus.ACCEPTED;

        PaginatedResponse<ConsultationsExamsResponse> response = new PaginatedResponse<>();
        response.setData(combinedData);
        response.setStatus(status);
        response.setMessage("Exibindo consultas e exames.");
        response.setTotalPages(Math.max(
            consultationsResponse.getTotalPages(), examsResponse.getTotalPages()));
        response.setTotalElements(
            consultationsResponse.getTotalElements() + examsResponse.getTotalElements());

        return response;
    }

}
