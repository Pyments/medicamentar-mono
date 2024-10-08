package com.medicamentar.medicamentar_api.application.dtos.examDto;

import java.util.Date;

public record  ExamResponse (
    Date date,
    String name,
    String local,
    String Description
) {
    
}
