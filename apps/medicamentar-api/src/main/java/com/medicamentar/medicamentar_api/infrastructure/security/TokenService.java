package com.medicamentar.medicamentar_api.infrastructure.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.repositories.UserRepository;

@Service
public class TokenService {
  @Value("${api.security.token.secret}")
  private String secret;
  private final UserRepository userRepo;
  private static final Logger logger = LoggerFactory.getLogger(TokenService.class);

  public TokenService(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  public String generateToken(User user) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      return JWT.create()
          .withIssuer("medicamentar-api")
          .withSubject(user.getEmail())
          .withExpiresAt(expirationDate())
          .sign(algorithm);
    } catch (JWTCreationException ex) {
      throw new RuntimeException("Error while authenticating");
    }
  }

  public String validateToken(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      return JWT.require(algorithm)
          .withIssuer("medicamentar-api")
          .build()
          .verify(token)
          .getSubject();
    } catch (JWTVerificationException exception) {
      return null;
    }
  }

  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
    String email;
    if (authentication.getPrincipal() instanceof User) {
        email = ((User) authentication.getPrincipal()).getEmail();
    } else {
        email = authentication.getName();
    }

    logger.info("Email: {}", email);
    
    return userRepo.findByEmail(email)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.UNAUTHORIZED,
            "Token inválido ou usuário não encontrado"
        ));
  }

  private Instant expirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  }
}