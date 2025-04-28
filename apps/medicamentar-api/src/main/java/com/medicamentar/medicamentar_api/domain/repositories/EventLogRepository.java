package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.EventLog;
import com.medicamentar.medicamentar_api.domain.entities.User;

import jakarta.annotation.Nullable;
@Repository
public interface EventLogRepository extends JpaRepository<EventLog, UUID> {
    Page<EventLog> findByUser(User user, @Nullable Pageable pageable);
}
