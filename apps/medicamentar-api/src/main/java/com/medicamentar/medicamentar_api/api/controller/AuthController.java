package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.dtos.authDto.LoginRequest;
import com.medicamentar.medicamentar_api.application.dtos.authDto.RegisterRequest;
import com.medicamentar.medicamentar_api.application.services.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @Operation(summary = "Autentica o usuário", method = "POST")
  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

    var response = this.authService.login(loginRequest);
    return response.getStatus() == HttpStatus.OK
        ? ResponseEntity.ok(response)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  @Operation(summary = "Registra um usuário", method = "POST")
  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {

    var response = this.authService.register(registerRequest);
    return response.getStatus() == HttpStatus.OK
        ? ResponseEntity.ok(response)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }
}

// Retornar o token quando se registrar? Ou apenas através do Login?
// String token = this.tokenService.generateToken(newUser);
