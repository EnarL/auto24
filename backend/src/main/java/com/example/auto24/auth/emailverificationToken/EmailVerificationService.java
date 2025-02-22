package com.example.auto24.auth.emailverificationToken;

import com.example.auto24.email.EmailService;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class EmailVerificationService {
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;

    public EmailVerificationService(EmailVerificationTokenRepository emailVerificationTokenRepository, EmailService emailService, UserRepository userRepository) {
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    public void confirmEmail(String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired token"));

        if (verificationToken.isTokenExpired()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }
        Users user = userRepository.findByEmail(verificationToken.getEmail());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        user.setActive(true);
        userRepository.save(user);
        emailVerificationTokenRepository.delete(verificationToken);
        sendNewsletter(user);
    }
    private void sendNewsletter(Users user) {
        emailService.sendNewsLetterEmail(user);
    }
}
