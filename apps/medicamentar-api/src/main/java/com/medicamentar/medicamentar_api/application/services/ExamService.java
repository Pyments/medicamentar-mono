package com.medicamentar.medicamentar_api.application.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.ExamDto.ExamRequest;
import com.medicamentar.medicamentar_api.domain.entities.Exam;
import com.medicamentar.medicamentar_api.domain.repositories.ExamRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final  ExamRepository repository;

    public List<Exam> getAllexams(){
        var allExams = this.repository.findAll();
        return (allExams);
    }

    public  String registerExam(ExamRequest data){
        Exam newExam = new Exam();
        newExam.setDate(data.date());
        newExam.setName(data.name());
        newExam.setLocal(data.local());
        newExam.setDescription(data.description());
        this.repository.save(newExam);
        return ("Exam Registered Successfully");

    }

    public String deleteExam(UUID id){
        this.repository.deleteById(id);
        return ("Exam Delete Successfully");
    }


}
