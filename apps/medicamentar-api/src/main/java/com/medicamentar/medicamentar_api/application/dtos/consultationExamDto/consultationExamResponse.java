package com.medicamentar.medicamentar_api.application.dtos.consultationExamDto;

import java.util.List;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;

public record consultationExamResponse(
    List<ConsultationResponse> consultations,
    List<ExamResponse> exams
){}
