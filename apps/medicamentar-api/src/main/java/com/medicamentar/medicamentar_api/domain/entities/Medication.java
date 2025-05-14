package com.medicamentar.medicamentar_api.domain.entities;

import java.util.ArrayList;
import java.util.List;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
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
    private Integer dose;
    private Integer dosesTaken = 0;
    private Double amount;
    private MedicationUnity unity;
    private Integer period;
    private boolean isContinuousUse;
    private ZonedDateTime start_date;
    private ZonedDateTime nextDose;
    private boolean isCompleted = false;

    @Setter(AccessLevel.NONE)
    private ZonedDateTime end_date;

    @PrePersist
    protected void onCreate() {
        if (this.start_date != null && isContinuousUse == false) {
            this.end_date = this.start_date.plusDays(this.period);
        } else {
            this.end_date = null;
        }
    }

    public boolean canTakeDose() {
        if (this.isContinuousUse == true || this.isCompleted == false) {
            return true;
        }
        return false;
    }

     public Integer getTotalDoses() {
        int dosesPerDay = 24 / this.dose;
        return dosesPerDay * this.period;
    }

    public void updateNextDose() {
        if (canTakeDose()) {
            this.nextDose = ZonedDateTime.now().plusHours(this.dose);
        }
    }

    @Embedded
    private OphthalmicDetails ophthalmicDetails;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "medication", cascade = CascadeType.ALL)
    private List<DoseHistory> doseHistory = new ArrayList<>();

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
