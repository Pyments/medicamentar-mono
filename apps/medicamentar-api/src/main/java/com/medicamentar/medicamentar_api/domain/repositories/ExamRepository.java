package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.Exam;
import com.medicamentar.medicamentar_api.domain.entities.User;

import jakarta.annotation.Nullable;

@Repository
public interface ExamRepository extends JpaRepository<Exam, UUID> {
    Page<Exam> findByUserAndDeletedAtIsNull(User user, @Nullable Pageable pageable);
    Optional<Exam> findByIdAndUserAndDeletedAtIsNull(UUID id, User user);
    Page<Exam> findByUserAndDeletedAtIsNullAndIsCompleted(User user, boolean isCompleted, @Nullable Pageable pageable);
    Optional<Exam> findByIdAndUserAndDeletedAtIsNullAndIsCompleted(UUID id, User user, boolean isCompleted);
}
