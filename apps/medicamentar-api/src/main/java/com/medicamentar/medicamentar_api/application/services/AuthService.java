package com.medicamentar.medicamentar_api.application.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.authDto.LoginRequest;
import com.medicamentar.medicamentar_api.application.dtos.authDto.RegisterRequest;
import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.repositories.UserRepository;
import com.medicamentar.medicamentar_api.infrastructure.security.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final TokenService tokenService;

  public ServiceResponse<String> login(LoginRequest loginRequest) {
    ServiceResponse<String> response = new ServiceResponse<String>();

    User user = this.repository.findByEmail(loginRequest.email())
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
      String token = this.tokenService.generateToken(user);
      response.setData(token);
      response.setMessage("Login successful");
      response.setStatus(HttpStatus.OK);
      return response;
    }

    response.setMessage("Bad request");
    response.setStatus((HttpStatus.BAD_REQUEST));

    return response;
  }

  public ServiceResponse<String> register(RegisterRequest registerRequest) {
    ServiceResponse<String> response = new ServiceResponse<String>();

    if (!registerRequest.password().equals(registerRequest.confirmPassword())) {
      response.setMessage(("Password do not match"));
      response.setStatus(HttpStatus.BAD_REQUEST);
      return response;
    }

    Optional<User> user = this.repository.findByEmail(registerRequest.email());
    if (user.isPresent()) {
      response.setMessage("Email already in use");
      response.setStatus(HttpStatus.BAD_REQUEST);
      return response;
    }

    User newUser = new User();
    newUser.setPassword(passwordEncoder.encode(registerRequest.password()));
    newUser.setEmail(registerRequest.email());
    newUser.setName(registerRequest.name());
    this.repository.save(newUser);

    String token = this.tokenService.generateToken(newUser);
    response.setData(token);
    response.setMessage("User registered successfully");
    response.setStatus(HttpStatus.CREATED);

    return response;
  }
}
