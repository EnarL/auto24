package com.example.auto24.users;


public record ChangePasswordRequest(
        String currentPassword,
        String newPassword,
        String confirmationPassword
) {

}