package com.medicamentar.medicamentar_api.application.services;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.application.dtos.responsesDto.ServiceResponse;
import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JavaMailSender mailSender;

  public ServiceResponse<String> createPasswordResetToken(String email) {
    ServiceResponse<String> response = new ServiceResponse<>();

    User user = userRepository.findByEmail(email).orElse(null);
    
    if (user == null) {
        response.setStatus(HttpStatus.NOT_FOUND);
        response.setMessage("Usuário não encontrado");
        return response;
    }

    user.setResetToken(UUID.randomUUID().toString());
    user.setResetTokenExpiry(LocalDateTime.now().plusHours(24));
    userRepository.save(user);

    sendResetEmail(user.getEmail(), user.getResetToken());

    response.setStatus(HttpStatus.OK);
    response.setMessage("Email de recuperação enviado!");

    return response;
}

  public ServiceResponse<String> resetPassword(String token, String newPassword) {
    ServiceResponse<String> response = new ServiceResponse<>();

    Optional<User> optionalUser = userRepository.findByResetToken(token);
    if (!optionalUser.isPresent()) {
        response.setStatus(HttpStatus.BAD_REQUEST);
        response.setMessage("Token inválido");
        return response;
    }

    User user = optionalUser.get();

    if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
        response.setStatus(HttpStatus.BAD_REQUEST);
        response.setMessage("Token expirado");
        return response;
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    user.setResetToken(null);
    user.setResetTokenExpiry(null);
    
    userRepository.save(user);

    response.setStatus(HttpStatus.OK);
    response.setMessage("Senha redefinida com sucesso");
    return response;
}

  private void sendResetEmail(String email, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("medicamentar056@gmail.com");
        message.setTo(email);
        message.setSubject("Recuperação de Senha");
        message.setText("Para resetar sua senha, use o token: " + token);
        mailSender.send(message);
    }

}
