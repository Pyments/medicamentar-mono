package com.medicamentar.medicamentar_api.api.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationRequest;
import com.medicamentar.medicamentar_api.application.services.ConsultationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping(value = "/consultation", produces = "application/json")
@Tag(name = "/consultation")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;

    @Operation(summary = "Adiciona uma consulta", method = "POST")
    @PostMapping()
    public ResponseEntity createConsultation(@RequestBody @Valid ConsultationRequest consultationRegisterDto){
        var response = this.consultationService.createConsultation(consultationRegisterDto);
        return response.getStatus() == HttpStatus.CREATED
                ? ResponseEntity.status(HttpStatus.CREATED).body(response)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    @Operation(summary = "Lista de consultas", method = "GET")
    @GetMapping()
    public ResponseEntity getConsultation(){
        var response = this.consultationService.getConsultations();

        return ResponseEntity.ok(response);
    }
    
    @Operation(summary = "Remova a consulta", method = "DELETE")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteConsultation(@PathVariable String id){
        var response = this.consultationService.deleteConsultation(id);
        return response.getStatus() == HttpStatus.CREATED
                ? ResponseEntity.status(HttpStatus.CREATED).body(response)
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
}
