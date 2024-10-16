package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.Consultation;

@Repository
public interface ConsultationRepository extends JpaRepository <Consultation, UUID> {
    @Query("SELECT c FROM Consultation c ORDER BY c.date DESC")
    Page<Consultation> findallOrderedByDate(Pageable pageable);
}
