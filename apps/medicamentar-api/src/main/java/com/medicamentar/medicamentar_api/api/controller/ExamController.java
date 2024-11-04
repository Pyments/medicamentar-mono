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
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamRequest;
import com.medicamentar.medicamentar_api.application.services.ExamService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/exam")
@Tag(name = "exam")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @Operation(summary = "Lista de Exames", method = "GET")
    @GetMapping
    public ResponseEntity<?> getAllexams() {
        var response = this.examService.getAllexams();
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    @Operation(summary = "Adiciona um Exame", method = "POST")
    @PostMapping
    public ResponseEntity<?> registerExam(@Valid @RequestBody ExamRequest data) {
        var response = this.examService.registerExam(data);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Edita um Exame", method = "PUT")
    @PutMapping
    @Transactional
    public ResponseEntity<?> updateExam(UUID examID,@Valid  @RequestBody  ExamRequest examRequest) {
        var response = this.examService.updateExam(examID, examRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Exclui um Exame", method = "DELETE")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable UUID id) {
        var response = this.examService.deleteExam(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
