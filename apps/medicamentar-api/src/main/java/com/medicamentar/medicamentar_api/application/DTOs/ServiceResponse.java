package com.medicamentar.medicamentar_api.application.DTOs;

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
}
