package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.UUID;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.Consultation;
import com.medicamentar.medicamentar_api.domain.entities.User;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, UUID> {
    List<Consultation> findByUser(User user);
    List<Consultation> findByUserAndDeletedAtIsNull(User user);
    Optional<Consultation> findByIdAndUser(UUID id, User user);
    Optional<Consultation> findByIdAndUserAndDeletedAtIsNull(UUID id, User user);
    Page<Consultation> findByUser(User user, Pageable pageable);
    Page<Consultation> findByUserAndDeletedAtIsNull(User user, Pageable pageable);
}
