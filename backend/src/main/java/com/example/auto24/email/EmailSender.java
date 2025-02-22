package com.example.auto24.email;

public interface EmailSender {
    void send(String to, String email, String subject);
}
