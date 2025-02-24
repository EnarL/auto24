package com.example.auto24.users;

import java.util.List;

public record UsersDTO(
        String username,
        String firstname,
        String lastname,
        String email,
        String phoneNumber,
        boolean newsletter,
        List<String> carIds,
        boolean active
) {}