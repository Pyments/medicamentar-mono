package com.medicamentar.medicamentar_api.application.dtos.responsesDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginatedResponse<T> extends ServiceResponse<T> {
    private int getTotalPages;
    private long getTotalElements;
}
