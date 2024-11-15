package com.medicamentar.medicamentar_api.domain.entities;

import java.util.UUID;

import com.medicamentar.medicamentar_api.domain.enums.MedicationType;
import com.medicamentar.medicamentar_api.domain.enums.MedicationUnity;

import java.util.Date;

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
    private Date start_date;
    private Date end_date;
    private Date first_dose;

    @Embedded
    private OphthalmicDetails ophthalmicDetails;
}
