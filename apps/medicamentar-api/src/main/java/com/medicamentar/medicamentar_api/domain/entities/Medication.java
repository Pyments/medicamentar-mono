package com.medicamentar.medicamentar_api.domain.entities;

import java.util.UUID;

import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.enums.MedicationUnity;

import java.time.ZonedDateTime;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AccessLevel;
import jakarta.persistence.PrePersist;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;
import jakarta.persistence.Column;

@Entity
@Table(name = "tb_medication")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private UUID id;
    private String name;
    private MedicationType type;
    private String dose;
    private Double amount;
    private MedicationUnity unity;
    private int period;
    private boolean isContinuousUse;
    private ZonedDateTime start_date;

    @Setter(AccessLevel.NONE)
    private ZonedDateTime end_date;

    @PrePersist
    protected void onCreate() {
        if (this.start_date != null) {
            this.end_date = this.start_date.plusDays(this.period);
        }
    }

    @Embedded
    private OphthalmicDetails ophthalmicDetails;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
