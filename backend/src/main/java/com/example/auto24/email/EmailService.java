package com.example.auto24.email;

import com.example.auto24.users.Users;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService implements EmailSender {

    private final static Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to, String email) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("hello@hello.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("Failed to send email", e);
            throw new IllegalStateException("Failed to send email");
        }
    }

    public void sendConfirmationEmail(Users user, String token) {
        String confirmationUrl = "http://localhost:8080/auth/confirm?token=" + token;
        String emailContent = "<html><body>"
                + "<h1>Welcome to Auto24, " + user.getFirstname() + "!</h1>"
                + "<p>Thank you for registering. Please confirm your email address by clicking the link below:</p>"
                + "<a href=\"" + confirmationUrl + "\">Confirm your email</a>"
                + "<p>Best regards,<br>Auto24 Team</p>"
                + "</body></html>";
        send(user.getEmail(), emailContent);
    }

    public void sendPasswordResetEmail(String to, String token) throws MessagingException {
        String subject = "Password Reset Request";
        String resetUrl = "http://localhost:8080/auth/reset-password?token=" + token;
        String message = "<html><body>"
                + "<h1>Password Reset Request</h1>"
                + "<p>Click the link below to reset your password:</p>"
                + "<a href=\"" + resetUrl + "\">Reset your password</a>"
                + "<p>If you did not request a password reset, please ignore this email.</p>"
                + "<p>Best regards,<br>Auto24 Team</p>"
                + "</body></html>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom("noreply@example.com");

        mailSender.send(mimeMessage);
    }
}