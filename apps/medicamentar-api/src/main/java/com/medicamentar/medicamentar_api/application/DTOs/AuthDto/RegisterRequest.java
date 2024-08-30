package com.medicamentar.medicamentar_api.application.dtos.AuthDto;

public record RegisterRequest(
  String name,
  String email,
  String password,
  String confirmPassword
) {}