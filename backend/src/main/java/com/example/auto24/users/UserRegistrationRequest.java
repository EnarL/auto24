package com.example.auto24.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegistrationRequest(
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
        String username,
        @NotBlank(message = "Firstname is required")
        String firstname,
        @NotBlank(message = "Lastname is required")
        String lastname,
        @NotBlank(message = "Password is required")
        String password,
        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        String email,
        Boolean newsletter
) {}