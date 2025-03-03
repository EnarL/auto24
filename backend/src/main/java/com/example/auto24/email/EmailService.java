package com.example.auto24.email;

import com.example.auto24.users.Users;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService implements EmailSender {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    private final String fromEmail;
    private final String appBaseUrl;

    public EmailService(JavaMailSender mailSender, @Value("${app.base.url}") String appBaseUrl, @Value("${MAIL_USERNAME}") String fromEmail) {
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
        this.appBaseUrl = appBaseUrl;
    }

    @Override
    @Async
    public void send(String to, String email, String subject) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom(fromEmail);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("Failed to send email", e);
            throw new IllegalStateException("Failed to send email");
        }
    }

    @Async
    public void sendConfirmationEmail(Users user, String token) throws MessagingException {
        String subject = "Confirm your email";
        String confirmationUrl = "http://localhost:8080" + "/auth/confirm?token=" + token;
        String emailContent = buildEmailContent(
                "Welcome to Auto24, " + user.getFirstname() + "!",
                "Thank you for registering. Please confirm your email address by clicking the link below:",
                confirmationUrl,
                "Confirm your email"
        );
        send(user.getEmail(), emailContent, subject);
    }

    @Async
    public void sendPasswordResetEmail(String to, String token) {
        String subject = "Password Reset Request";
        String resetUrl = appBaseUrl + "/reset_password?token=" + token;
        String message = buildEmailContent(
                "Password Reset Request",
                "Click the link below to reset your password:",
                resetUrl,
                "Reset your password"
        );

        send(to, message, subject);
    }

    @Async
    public void sendNewsLetterEmail(Users user) {
        String subject = "Auto24 Newsletter";
        String message = buildEmailContent(
                "Auto24 Newsletter",
                "Dear " + user.getFirstname() + ",<br>Check out our latest offers and news!",
                null,
                null
        );

        send(user.getEmail(), message, subject);
    }

    private String buildEmailContent(String title, String body, String link, String linkText) {
        StringBuilder emailBuilder = new StringBuilder("<html><body>");
        emailBuilder.append("<h1>").append(title).append("</h1>")
                .append("<p>").append(body).append("</p>");
        if (link != null && linkText != null) {
            emailBuilder.append("<a href=\"").append(link).append("\">").append(linkText).append("</a>");
        }
        emailBuilder.append("<p>Best regards,<br>Auto24 Team</p>")
                .append("</body></html>");
        return emailBuilder.toString();
    }
}
