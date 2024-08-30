package com.medicamentar.medicamentar_api.domain.entities;

import java.util.UUID;
import java.util.Date;


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
    private String type;
    private String dose;
    private Double amount;
    private String unity;
    private Date period;
    private Date validate;

}
