package com.medicamentar.medicamentar_api.api.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationRequest;
import com.medicamentar.medicamentar_api.application.services.MedicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping(value = "/medication", produces = {"application/json"})
@Tag(name = "Medication")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationService medService;

    @Operation(summary = "Visualização do medicamento adicionado.", method = "GET")
    @GetMapping()
    public ResponseEntity getMedication() {
        var response = this.medService.getMedications();

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Adiciona um novo medicamento", method = "POST")
    @PostMapping()
    public ResponseEntity createMedication(@RequestBody @Valid MedicationRequest medicationRegisterDto){
        var response = this.medService.createMedication(medicationRegisterDto);
        return ResponseEntity.status(response.getStatus()).body(response);
    }


    @Operation(summary = "Edita o medicamento selecionado.", method = "PUT")
    @PutMapping("/{id}")
    public ResponseEntity updateMedication(@PathVariable String id, @RequestBody @Valid MedicationRequest updateMedication){
        var response = this.medService.updateMedication(id, updateMedication);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Exclui o medicamento.", method = "DELETE")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteMedication(@PathVariable String id){
        var response = this.medService.deleteMedication(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

}
