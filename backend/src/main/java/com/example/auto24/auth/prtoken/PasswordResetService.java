package com.example.auto24.auth.prtoken;

import com.example.auto24.email.EmailService;
import com.example.auto24.users.ResetPasswordRequest;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.UUID;

@Service
public class PasswordResetService {
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(PasswordResetTokenRepository passwordResetTokenRepository,
                                UserRepository userRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void requestPasswordReset(String email) {
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kasutajat ei leitud");
        }
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .email(email)
                .expiryDuration(86400000L)
                .createdAt(Instant.now())
                .isVerified(false)
                .build();
        passwordResetTokenRepository.save(resetToken);
        try {
            emailService.sendPasswordResetEmail(email, token);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save password reset token", e);
        }
    }

    @Transactional
    public void resetPassword(String token, ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.isTokenExpired()) {
            throw new IllegalStateException("Token has expired");
        }

        if (!request.newPassword().equals(request.confirmationPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New password and confirmation password do not match");
        }
        if (request.newPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must have minimum 8 characters");
        }

        Users user = userRepository.findByEmail(resetToken.getEmail());
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
    }
    public void validateResetToken(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired token"));

        if (resetToken.isTokenExpired()) {
            throw new RuntimeException("Token has expired");
        }
    }
}
