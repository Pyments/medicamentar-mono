package com.medicamentar.medicamentar_api.application.dtos.consultationDto;

import java.util.Date;

public record ConsultationRequest (
    Date date,
    String doctorName,
    String local,
    String description
){}
