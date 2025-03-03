package com.example.auto24.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {


    private final String host;
    private final int port;
    private final String username;
    private final String password;
    private final String smtpAuth;
    private final String starttls;
    private final String mailDebug;

    public MailConfig(@Value("${MAIL_HOST}") String host,
                      @Value("${MAIL_PORT}")int port,
                      @Value("${MAIL_USERNAME}")String username,
                      @Value("${MAIL_PASSWORD}") String password,
                      @Value("${MAIL_SMTP_AUTH}") String smtpAuth,
                      @Value("${MAIL_STARTTLS_ENABLE}") String starttls,
                      @Value("${MAIL_DEBUG}")String mailDebug) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.smtpAuth = smtpAuth;
        this.starttls = starttls;
        this.mailDebug = mailDebug;
    }

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