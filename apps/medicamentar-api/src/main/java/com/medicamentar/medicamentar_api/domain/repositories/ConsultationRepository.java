package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.UUID;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.entities.User;

import jakarta.annotation.Nullable;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, UUID> {
    Page<Consultation> findByUserAndDeletedAtIsNull(User user, @Nullable Pageable pageable);
    Optional<Consultation> findByIdAndUserAndDeletedAtIsNull(UUID id, User user);
    Page<Consultation> findByUserAndDeletedAtIsNullAndCompleted(User user, boolean completed, @Nullable Pageable pageable);
    Optional<Consultation> findByIdAndUserAndDeletedAtIsNullAndCompleted(UUID id, User user, boolean completed);
}
