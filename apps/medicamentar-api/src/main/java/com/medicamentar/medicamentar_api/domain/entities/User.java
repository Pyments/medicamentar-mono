package com.medicamentar.medicamentar_api.domain.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
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
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "profile_image")
  private String profileImage;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = true)
  private int age = 0;

  @Column(nullable = true)
  private double weigth;

  @Column(nullable = true)
  private String bloodType = "";

  @Column(nullable = true)
  private double height;

  @Column(nullable = true)
  private String address;

  @Column(nullable = true)
  private String resetToken;

  @Column(nullable = true)
  private LocalDateTime resetTokenExpiry;
}