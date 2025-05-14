package com.medicamentar.medicamentar_api.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_dose_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoseHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "medication_id", nullable = false)
    private Medication medication;

    private ZonedDateTime scheduledTime;
    private ZonedDateTime takenTime;
}