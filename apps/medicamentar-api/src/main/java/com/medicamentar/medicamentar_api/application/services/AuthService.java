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
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenService tokenService;

  public ServiceResponse<String> login(LoginRequest loginRequest) {
    ServiceResponse<String> response = new ServiceResponse<String>();

    User user = this.userRepository.findByEmail(loginRequest.email()).orElse(null);

    if (user == null) {
      response.setStatus(HttpStatus.NOT_FOUND);
      response.setMessage("Usuário não encontrado");
      return response;
    }

    if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
      response.setMessage("Senha incorreta!");
      response.setStatus(HttpStatus.UNAUTHORIZED);
      return response;
    }

    String token = this.tokenService.generateToken(user);
    response.setData(token);
    response.setMessage("Login successful");
    response.setStatus(HttpStatus.OK);
    return response;

  }

  public ServiceResponse<String> register(RegisterRequest registerRequest) {
    ServiceResponse<String> response = new ServiceResponse<String>();

    if (!registerRequest.password().equals(registerRequest.confirmPassword())) {
      response.setMessage(("As senhas não coincidem!"));
      response.setStatus(HttpStatus.BAD_REQUEST);
      return response;
    }

    Optional<User> user = this.userRepository.findByEmail(registerRequest.email());
    if (user.isPresent()) {
      response.setMessage("Esse email já está em uso!");
      response.setStatus(HttpStatus.BAD_REQUEST);
      return response;
    }

    User newUser = new User();
    newUser.setPassword(passwordEncoder.encode(registerRequest.password()));
    newUser.setEmail(registerRequest.email());
    newUser.setName(registerRequest.name());
    this.userRepository.save(newUser);

    String token = this.tokenService.generateToken(newUser);
    response.setData(token);
    response.setMessage("Usuário registrado com sucesso!");
    response.setStatus(HttpStatus.CREATED);

    return response;
  }
}
