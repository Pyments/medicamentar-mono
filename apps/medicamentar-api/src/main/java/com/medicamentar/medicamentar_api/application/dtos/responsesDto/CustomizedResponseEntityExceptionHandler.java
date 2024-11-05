package com.medicamentar.medicamentar_api.application.dtos.responsesDto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ServiceResponse<List<String>>> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException ex) {
    List<String> errors = ex.getBindingResult().getFieldErrors().stream()
            .map(error -> "Field '" + error.getField() + "': " + error.getDefaultMessage())
            .collect(Collectors.toList());

    ServiceResponse<List<String>> response = new ServiceResponse<>(
        errors,
        "Validação falhou!",
        HttpStatus.BAD_REQUEST
    );

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
}
}