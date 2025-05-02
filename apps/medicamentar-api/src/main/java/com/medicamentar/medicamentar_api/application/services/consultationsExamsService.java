package com.medicamentar.medicamentar_api.application.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.consultationExamDto.consultationsExamsResponse;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class consultationsExamsService {
    private final ConsultationService consultationService;
    private final ExamService examService;

    public ServiceResponse<consultationsExamsResponse> getConsultationsAndExams(int page, int size) {
        var consultationsResponse = consultationService.getConsultations(page, size);
        var examsResponse = examService.getAllexams(page, size);

        var response = new consultationsExamsResponse(
            consultationsResponse.getData(),
            examsResponse.getData()
        );

        var status = (consultationsResponse.getStatus().isError() || examsResponse.getStatus().isError())
            ? HttpStatus.PARTIAL_CONTENT : HttpStatus.ACCEPTED;


        return new ServiceResponse<>(response, "Consultas e exames retornados com sucesso", status);
    }

}
