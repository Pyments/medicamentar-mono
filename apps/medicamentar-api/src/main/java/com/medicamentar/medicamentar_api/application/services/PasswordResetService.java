package com.medicamentar.medicamentar_api.application.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.medicamentar.medicamentar_api.domain.entities.User;
import com.medicamentar.medicamentar_api.domain.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JavaMailSender mailSender;

  public void createPasswordResetToken(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setResetToken(UUID.randomUUID().toString());
    user.setResetTokenExpiry(LocalDateTime.now().plusHours(24));
    userRepository.save(user);

    sendResetEmail(user.getEmail(), user.getResetToken());
  }

  public void resetPassword(String token, String newPassword) {
    User user = userRepository.findByResetToken(token)
            .orElseThrow(() -> new RuntimeException("Token inválido"));
    
    if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
        throw new RuntimeException("Token expirado");
    }
    
    // Atualiza senha e limpa token
    user.setPassword(passwordEncoder.encode(newPassword));
    user.setResetToken(null);
    user.setResetTokenExpiry(null);
    
    userRepository.save(user);
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
