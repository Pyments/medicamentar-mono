package com.medicamentar.medicamentar_api.application.DTOs.AuthDto;

public record RegisterRequest(
  String name,
  String email,
  String password,
  String confirmPassword
) {}