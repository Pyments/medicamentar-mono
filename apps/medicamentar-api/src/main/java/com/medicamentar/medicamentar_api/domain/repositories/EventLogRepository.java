package com.medicamentar.medicamentar_api.domain.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicamentar.medicamentar_api.domain.entities.EventLog;
import com.medicamentar.medicamentar_api.domain.entities.User;

@Repository
public interface EventLogRepository extends JpaRepository<EventLog, UUID> {
    List<EventLog> findByUser(User user);
}
