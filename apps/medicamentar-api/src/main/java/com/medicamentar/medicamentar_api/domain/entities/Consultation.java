package com.medicamentar.medicamentar_api.domain.entities;

import java.util.Date;
import java.util.UUID;

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
@Table(name = "consultation")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private UUID id;
    private Date date;
    private String doctorName;
    private String local;
    private String description;

}
