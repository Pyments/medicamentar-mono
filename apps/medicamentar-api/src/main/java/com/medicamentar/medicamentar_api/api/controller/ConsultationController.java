package com.medicamentar.medicamentar_api.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;

import com.medicamentar.medicamentar_api.application.dtos.consultationDto.ConsultationRequest;
import com.medicamentar.medicamentar_api.application.services.ConsultationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/consultation", produces = "application/json")
@Tag(name = "Consultation")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;

    @Operation(summary = "Adiciona uma consulta", method = "POST")
    @PostMapping()
    public ResponseEntity createConsultation(@RequestBody @Valid ConsultationRequest consultationRegisterDto) {
        var response = this.consultationService.createConsultation(consultationRegisterDto);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @Operation(summary = "Lista de consultas", method = "GET")
    @GetMapping()
    public ResponseEntity getConsultations(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "9") int size) {
        var response = this.consultationService.getConsultations(page, size);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Edita uma consulta", method = "PUT")
    @PutMapping("/{consultationID}")
    public ResponseEntity updateConsultation(@PathVariable UUID consultationID, @RequestBody @Valid ConsultationRequest consultationRequest) {
        var response = this.consultationService.updateConsultation(consultationID, consultationRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @Operation(summary = "Exclui uma consulta", method = "DELETE")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteConsultation(@PathVariable String id) {
        var response = this.consultationService.deleteConsultation(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Marca a consulta como completa", method = "PATCH")
    @PatchMapping("/{id}/complete")
    public ResponseEntity toggleComplete(@PathVariable String id) {
        var response = this.consultationService.toggleComplete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Lista de consultas concluídas", method = "GET")
    @GetMapping("/completed")
    public ResponseEntity getCompletedConsultations(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "9") int size) {
        var response = this.consultationService.getCompletedConsultations(page, size);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
