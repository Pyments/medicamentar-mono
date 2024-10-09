package com.medicamentar.medicamentar_api.application.dtos.examDto;

import java.util.Date;
import java.util.UUID;

public record  ExamResponse (
    UUID id,
    Date date,
    String name,
    String local,
    String Description
) {
    
}
