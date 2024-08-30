package com.medicamentar.medicamentar_api.domain.repositories;


import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicamentar.medicamentar_api.domain.entities.Exam;

public interface  ExamRepository extends JpaRepository<Exam, UUID> {
    
}
