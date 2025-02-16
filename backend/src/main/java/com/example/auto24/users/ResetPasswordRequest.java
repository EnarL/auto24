package com.example.auto24.users;

public record ResetPasswordRequest(
        String newPassword,
        String confirmationPassword
) {

}
