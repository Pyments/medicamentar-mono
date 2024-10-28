package com.medicamentar.medicamentar_api.application.dtos.eventDto;

import java.util.List;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationResponse;
import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamResponse;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationResponse;

public record EventResponse (
    List<MedicationResponse> medicationResponse,
    List<ConsultationResponse> consultationResponse,
    List<ExamResponse> examResponse

) {
}
