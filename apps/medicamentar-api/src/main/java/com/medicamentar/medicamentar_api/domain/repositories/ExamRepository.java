package com.medicamentar.medicamentar_api.domain.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.Exam;
import com.medicamentar.medicamentar_api.domain.entities.User;

@Repository
public interface ExamRepository extends JpaRepository<Exam, UUID> {
    List<Exam> findByUser(User user);
    Optional<Exam> findByIdAndUser(UUID id, User user);
    Page<Exam> findByUser(User user, Pageable pageable);
    Optional<Exam> findByNameAndDateAndUser(String name, LocalDateTime date, User user);
}
