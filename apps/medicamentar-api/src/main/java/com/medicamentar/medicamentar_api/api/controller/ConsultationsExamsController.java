package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.consultationExamDto.consultationExamResponse;
import com.medicamentar.medicamentar_api.application.services.ConsultationService;
import com.medicamentar.medicamentar_api.application.services.ExamService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(value = "/consultations", produces = "application/json")
@Tag(name = "Consultations/Exams")
@RequiredArgsConstructor
public class ConsultationsExamsController {

    private final ConsultationService consultationService;
    private final ExamService examService;

    @Operation(summary = "Lista de consultas e exames", method = "GET")
    @GetMapping()
    public ResponseEntity getConsultationsExams(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "9") int size) {
                                                    
        var consultations = consultationService.getConsultations(page, size).getData();
        var exams = examService.getAllexams(page, size).getData();

        var response = new consultationExamResponse(consultations, exams);
        return ResponseEntity.ok(response);

    }
    
}
