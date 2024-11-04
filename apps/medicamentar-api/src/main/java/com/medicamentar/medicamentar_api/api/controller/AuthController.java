package com.medicamentar.medicamentar_api.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.medicamentar.medicamentar_api.application.dtos.authDto.LoginRequest;
import com.medicamentar.medicamentar_api.application.dtos.authDto.RegisterRequest;
import com.medicamentar.medicamentar_api.application.services.AuthService;
import com.medicamentar.medicamentar_api.application.services.PasswordResetService;

import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  private final PasswordResetService passwordResetService;

  private final TokenService tokenService;

  @Operation(summary = "Autentica o usuário", method = "POST")
  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {

    var response = this.authService.login(loginRequest);
    return ResponseEntity.status(response.getStatus()).body(response);

  }

  @Operation(summary = "Registra um usuário", method = "POST")
  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {

    var response = this.authService.register(registerRequest);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PostMapping("/forgot")
  public ResponseEntity<?> forgotPassword(@RequestParam String email) {
    var response = this.passwordResetService.createPasswordResetToken(email);

    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @PostMapping("/reset")
  public ResponseEntity<?> resetPassword(
      @RequestParam String token,
      @RequestParam String newPassword) {
    var response = this.passwordResetService.resetPassword(token, newPassword);
    return ResponseEntity.status(response.getStatus()).body(response);
  }

  @GetMapping("/validate-token")
  public ResponseEntity<Void> validateToken(HttpServletRequest request) {
    String token = this.extractToken(request);
    if (token != null && tokenService.validateToken(token) != null) {
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

  private String extractToken(HttpServletRequest request) {
    var authHeader = request.getHeader("Authorization");
    if (authHeader == null)
      return null;
    return authHeader.replace("Bearer ", "");
  }

}