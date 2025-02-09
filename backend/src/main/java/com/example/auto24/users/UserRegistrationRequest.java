package com.example.auto24.users;

public record UserRegistrationRequest(
        String username,
        String firstname,
        String lastname,
        String password,
        String email,
        Boolean newsletter
) {}