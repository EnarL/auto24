package com.example.auto24.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {

    private final Dotenv dotenv = Dotenv.configure().directory("backend").load();

    private final String host = dotenv.get("MAIL_HOST");
    private final int port = Integer.parseInt(dotenv.get("MAIL_PORT"));
    private final String username = dotenv.get("MAIL_USERNAME");
    private final String password = dotenv.get("MAIL_PASSWORD");
    private final String smtpAuth = dotenv.get("MAIL_SMTP_AUTH");
    private final String starttls = dotenv.get("MAIL_STARTTLS_ENABLE");
    private final String mailDebug = dotenv.get("MAIL_DEBUG");

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", smtpAuth);
        props.put("mail.smtp.starttls.enable", starttls);
        props.put("mail.debug", mailDebug);

        return mailSender;
    }
}