package com.medicamentar.medicamentar_api.application.dtos.responsesDto;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponse<T> {
  private T data;
  private String message;
  private HttpStatus status;
  private int getTotalPages;
  private long getTotalElements;

  public ServiceResponse(T data, String message, HttpStatus status) {
    this.data = data;
    this.message = message;
    this.status = status;
}
}
