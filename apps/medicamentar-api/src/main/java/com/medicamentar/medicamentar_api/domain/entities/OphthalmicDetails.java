package com.medicamentar.medicamentar_api.domain.entities;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OphthalmicDetails {

    private int leftEyeFrequency;
    private int leftEyeQuantity;
    private int leftEyeDrops;

    private int rightEyeFrequency;
    private int rightEyeQuantity;
    private int rightEyeDrops;
}
