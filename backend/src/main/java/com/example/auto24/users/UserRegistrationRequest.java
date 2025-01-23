package com.example.auto24.users;

public record UserRegistrationRequest(
        String email,
        String username,
        String password,
        String firstname,
        String lastname,
        Boolean newsletter
) {}