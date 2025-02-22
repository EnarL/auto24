package com.example.auto24.users;
import jakarta.validation.constraints.NotBlank;
public record ResetPasswordRequest(
        @NotBlank(message = "New password cannot be blank")
        String newPassword,
        @NotBlank(message = "Confirmation password cannot be blank")
        String confirmationPassword
) {

}
