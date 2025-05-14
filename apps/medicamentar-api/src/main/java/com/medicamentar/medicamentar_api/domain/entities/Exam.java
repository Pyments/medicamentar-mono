package com.medicamentar.medicamentar_api.domain.entities;

import java.time.ZonedDateTime;
import java.util.UUID;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Column;

@Table(name = "exam")
@Entity(name = "exam")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")

public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private UUID id;

    private ZonedDateTime date;

    private String name;

    private String local;

    private String description;

    private boolean isCompleted = false;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
