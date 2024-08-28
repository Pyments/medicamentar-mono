package com.medicamentar.medicamentar_api.application.DTOs.AuthDto;

public record LoginRequest(
String email,
String password
) {}
