package com.medicamentar.medicamentar_api.infrastructure.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.medicamentar.medicamentar_api.domain.entities.User;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class TokenService {
  @Value("${api.security.token.secret}")
  private String secret;

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

   public String validateToken(String token){
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

  public String getEmailFromToken(HttpServletRequest request) {
        // Obtém o token do header "Authorization"
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove o prefixo "Bearer "

            try {
                Algorithm algorithm = Algorithm.HMAC256(secret);
                JWTVerifier verifier = JWT.require(algorithm)
                        .withIssuer("medicamentar-api")
                        .build();

                DecodedJWT jwt = verifier.verify(token);

                // Obtém o e-mail (assumindo que foi colocado no 'subject' durante a criação)
                return jwt.getSubject(); 

            } catch (JWTVerificationException exception) {
                throw new RuntimeException("Token inválido ou expirado.", exception);
            }
        } else {
            throw new RuntimeException("Token de autenticação não fornecido.");
        }
    }

  private Instant expirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  }
}