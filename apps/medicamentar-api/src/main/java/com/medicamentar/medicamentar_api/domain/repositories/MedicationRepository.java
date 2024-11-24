package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.UUID;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.Medication;
import com.medicamentar.medicamentar_api.domain.entities.User;

import jakarta.annotation.Nullable;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, UUID> {
    Page<Medication> findByUserAndDeletedAtIsNull(User user, @Nullable Pageable pageable);
    Optional<Medication> findByIdAndUserAndDeletedAtIsNull(UUID id, User user);
}
