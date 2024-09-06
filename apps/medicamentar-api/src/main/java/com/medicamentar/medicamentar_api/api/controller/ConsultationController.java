package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.ConsultationDto.ConsultationRequest;
import com.medicamentar.medicamentar_api.application.services.ConsultationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping(value = "/consultation", produces = "application/json")
@Tag(name = "/consultation")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;

    @Operation(summary = "Adiciona uma consulta", method = "POST")
    @PostMapping()
    public ResponseEntity createConsultation(@RequestBody ConsultationRequest consultationRegister){
        var response = this.consultationService.createConsultation(consultationRegister);
        return ResponseEntity.ok(response);
    }
    
    @Operation(summary = "Lista de consultas", method = "GET")
    @GetMapping()
    public ResponseEntity getConsultation(){
        var response = this.consultationService.getConsultations();

        return ResponseEntity.ok(response);
    }
    
    @Operation(summary = "Remova a consulta", method = "DELETE")
    @DeleteMapping("{/id}")
    public ResponseEntity deleteConsultation(String id){
        var response = this.consultationService.deleteConsultation(id);

        return ResponseEntity.ok(response);
    }
    
}
