package com.example.auto24.users;

public record UpdateUserDataRequest(
        String username,
        String firstname,
        String lastname,
        String email,
        boolean newsletter,
        String phoneNumber
) {

}
