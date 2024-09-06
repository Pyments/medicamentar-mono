package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.medicationDto.MedicationRequest;
import com.medicamentar.medicamentar_api.application.dtos.medicationDto.UpdateRequest;
import com.medicamentar.medicamentar_api.application.services.MedicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping(value = "/medicamentations", produces = {"application/json"})
@Tag(name = "Medication")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationService medService;

    @Operation(summary = "Adiciona um novo medicamento", method = "POST")
    @PostMapping()
    public ResponseEntity createMedication(@RequestBody MedicationRequest medicationRegisterDto){
        var response = this.medService.createMedication(medicationRegisterDto);
        return ResponseEntity.ok(response);
    }
    
    @Operation(summary = "Visualização do medicamento adicionado.", method = "GET")
    @GetMapping()
    public ResponseEntity getMedication() {
        var response = this.medService.getMedications();

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Edita o medicamento selecionado.", method = "PUT")
    @PutMapping()
    public ResponseEntity updateMedication(String id, @RequestBody UpdateRequest updateMedication){
        var response = this.medService.updateMedication(id, updateMedication);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Exclui o medicamento.", method = "DELETE")
    @DeleteMapping("{/id}")
    public ResponseEntity deleteMedication(String id){
        var response = this.medService.deleteMedication(id);

        return ResponseEntity.ok(response);
    }

   
} 
