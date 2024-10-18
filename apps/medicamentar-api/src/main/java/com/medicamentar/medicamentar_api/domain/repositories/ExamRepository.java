package com.medicamentar.medicamentar_api.domain.repositories;


import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicamentar.medicamentar_api.domain.entities.Exam;

public interface  ExamRepository extends JpaRepository<Exam, UUID> {
    Optional<Exam> findByNameAndDate(String name, Date date);
}
