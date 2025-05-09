package com.medicamentar.medicamentar_api.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.examDto.ExamRequest;
import com.medicamentar.medicamentar_api.application.services.ExamService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/exam", produces = {"application/json"})
@Tag(name = "Exam")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService examService;

    @Operation(summary = "Lista de Exames com paginação", method = "GET")
    @GetMapping()
    public ResponseEntity getAllexams(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "9") int size) {
        var response = this.examService.getAllexams(page, size);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Adiciona um Exame", method = "POST")
    @PostMapping()
    public ResponseEntity registerExam(@RequestBody @Valid ExamRequest data) {
        var response = this.examService.registerExam(data);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Edita um Exame", method = "PUT")
    @PutMapping("/{examID}")
    public ResponseEntity updateExam(@PathVariable UUID examID, @RequestBody @Valid ExamRequest examRequest) {
        var response = this.examService.updateExam(examID, examRequest);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Exclui um Exame", method = "DELETE")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteExam(@PathVariable UUID id) {
        var response = this.examService.deleteExam(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Marca o exame como completo", method = "PATCH")
    @PatchMapping("/{id}/complete")
    public ResponseEntity toggleComplete(@PathVariable UUID id) {
        var response = this.examService.toggleComplete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Operation(summary = "Lista de Exames concluídos com paginação", method = "GET")
    @GetMapping("/completed")
    public ResponseEntity getCompletedExams(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "9") int size) {
        var response = this.examService.getCompletedExams(page, size);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
