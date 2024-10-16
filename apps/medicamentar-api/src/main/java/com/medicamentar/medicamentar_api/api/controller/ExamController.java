package com.medicamentar.medicamentar_api.api.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.ExamDto.ExamRequest;
import com.medicamentar.medicamentar_api.application.services.ExamService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/exam")
@Tag(name = "Exam")
@RequiredArgsConstructor

public class ExamController {

    private final  ExamService service;

    @Operation(summary= "Obtém todos os exames", method= "GET")
    @GetMapping
<<<<<<< Updated upstream
    public ResponseEntity getAllexams(){
        var allExams = this.service.getAllexams();
=======
    public ResponseEntity<?> getAllexams(){
        var allExams = this.examService.getAllexams();
>>>>>>> Stashed changes
        return ResponseEntity.ok(allExams);
    }
    @Operation(summary= "Registra os exames", method= "POST")
    @PostMapping
<<<<<<< Updated upstream
    public  ResponseEntity registerExam(@RequestBody @Valid ExamRequest data){
        this.service.registerExam(data);
=======
    public  ResponseEntity<?> registerExam(@RequestBody @Valid ExamRequest data){
        this.examService.registerExam(data);
>>>>>>> Stashed changes
        return ResponseEntity.ok().build();
    }

    @Operation(summary= "Edita os exames", method= "PUT")
    @PutMapping
    @Transactional
<<<<<<< Updated upstream
    public ResponseEntity updateExam(@RequestBody @Valid ExamRequest data){
        this.service.updateExam(data);
=======
    public ResponseEntity<?> updateExam(@RequestBody @Valid ExamRequest data){
        this.examService.updateExam(data);
>>>>>>> Stashed changes
        return ResponseEntity.ok().build();
    }
    @Operation(summary= "Exclui os exames", method= "DELETE")
    @DeleteMapping("/{id}")
<<<<<<< Updated upstream
    public ResponseEntity deleteExam(@PathVariable UUID id){
        var response = this.service.deleteExam(id);
        return ResponseEntity.ok(response);
=======
    public ResponseEntity<?> deleteExam(@PathVariable UUID id){
        var response = this.examService.deleteExam(id);
        return response != null
            ? ResponseEntity.ok(response)
            : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exam not found");
>>>>>>> Stashed changes
    }
    
}
    
    