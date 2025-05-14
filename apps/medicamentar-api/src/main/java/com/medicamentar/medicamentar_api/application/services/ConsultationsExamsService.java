package com.medicamentar.medicamentar_api.application.services;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.consultationExamDto.ConsultationsExamsResponse;
import com.medicamentar.medicamentar_api.application.dtos.consultationExamDto.UnifiedConsultationExamResponse;
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

        List<UnifiedConsultationExamResponse> allEvents = new ArrayList<>();
        ZonedDateTime now = ZonedDateTime.now();

        // Converter consultas
        if (consultationsResponse.getData() != null) {
            consultationsResponse.getData().forEach(cons -> {
                if (!cons.isCompleted() && cons.date() != null && cons.date().isAfter(now)) {
                    allEvents.add(new UnifiedConsultationExamResponse(
                        cons.id(),
                        cons.doctorName(),
                        "CONSULTATION",
                        cons.date(),
                        cons.local(),
                        cons.description(),
                        cons.isCompleted()
                    ));
                }
            });
        }

        // Converter exames
        if (examsResponse.getData() != null) {
            examsResponse.getData().forEach(exam -> {
                if (!exam.isCompleted() && exam.date() != null && exam.date().isAfter(now)) {
                    allEvents.add(new UnifiedConsultationExamResponse(
                        exam.id(),
                        exam.name(),
                        "EXAM",
                        exam.date(),
                        exam.local(),
                        exam.description(),
                        exam.isCompleted()
                    ));
                }
            });
        }

        // Ordenar por data mais próxima primeiro (do mais próximo para o mais distante)
        allEvents.sort((a, b) -> {
            if (a.date() == null && b.date() == null) return 0;
            if (a.date() == null) return 1;
            if (b.date() == null) return -1;
            return a.date().compareTo(b.date()); // Ordem crescente (mais próximo primeiro)
        });

        ConsultationsExamsResponse combinedData = new ConsultationsExamsResponse(allEvents);

        HttpStatus status = (consultationsResponse.getStatus().isError() || examsResponse.getStatus().isError())
                ? HttpStatus.PARTIAL_CONTENT
                : HttpStatus.ACCEPTED;

        PaginatedResponse<ConsultationsExamsResponse> response = new PaginatedResponse<>();
        response.setData(combinedData);
        response.setStatus(status);
        response.setMessage("Exibindo consultas e exames.");
        response.setTotalPages(Math.max(
            consultationsResponse.getTotalPages(), examsResponse.getTotalPages()));
        response.setTotalElements((long) allEvents.size());

        return response;
    }

}
