package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.UUID;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.Medication;
import com.medicamentar.medicamentar_api.domain.entities.User;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, UUID> {
    //TODO: Verificar se é necessário ter todos esses métodos
    List<Medication> findByUser(User user);
    List<Medication> findByUserAndDeletedAtIsNull(User user);
    Optional<Medication> findByIdAndUser(UUID id, User user);
    Page<Medication> findByUser(User user, Pageable pageable);
    Optional<Medication> findByIdAndUserAndDeletedAtIsNull(UUID id, User user);
    Page<Medication> findByUserAndDeletedAtIsNull(User user, Pageable pageable);
}
