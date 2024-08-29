package com.medicamentar.medicamentar_api.api.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicamentar.medicamentar_api.application.DTOs.ServiceResponse;
import com.medicamentar.medicamentar_api.application.DTOs.AuthDto.LoginRequest;
import com.medicamentar.medicamentar_api.application.DTOs.AuthDto.RegisterRequest;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.repositories.UserRepository;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth")
@RequiredArgsConstructor
public class AuthController {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final TokenService tokenService;

  @PostMapping("/login")
  public ResponseEntity login(@RequestBody LoginRequest loginRequest) {
    ServiceResponse<String> response = new ServiceResponse<String>();

    User user = this.repository.findByEmail(loginRequest.email())
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
      String token = this.tokenService.generateToken(user);
      response.setData(token);
      response.setMessage("Login successful");
      response.setStatus(HttpStatus.ACCEPTED);
      return ResponseEntity.ok(response);
    }
    return ResponseEntity.badRequest().build();
  }

  @PostMapping("/register")
  public ResponseEntity register(@RequestBody RegisterRequest request) {
    ServiceResponse<String> response = new ServiceResponse<String>();

    if (!request.password().equals(request.confirmPassword())) {
      response.setMessage(("Password do not match"));
      response.setStatus(HttpStatus.BAD_REQUEST);
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    Optional<User> user = this.repository.findByEmail(request.email());
    if (user.isPresent()) {
      response.setMessage("Email already in use");
      response.setStatus(HttpStatus.BAD_REQUEST);
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    User newUser = new User();
    newUser.setPassword(passwordEncoder.encode(request.password()));
    newUser.setEmail(request.email());
    newUser.setName(request.name());
    this.repository.save(newUser);

    response.setMessage("User registered successfully");
    response.setStatus(HttpStatus.CREATED);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}

// Retornar o token quando se registrar? Ou apenas através do Login?
// String token = this.tokenService.generateToken(newUser);
