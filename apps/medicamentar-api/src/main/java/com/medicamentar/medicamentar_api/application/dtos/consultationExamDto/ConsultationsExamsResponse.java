package com.medicamentar.medicamentar_api.application.dtos.consultationExamDto;

import java.util.List;

public record ConsultationsExamsResponse(
    List<UnifiedConsultationExamResponse> events
){}
