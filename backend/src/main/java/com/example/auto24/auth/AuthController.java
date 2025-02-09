package com.example.auto24.auth;

import com.example.auto24.users.ChangePasswordRequest;
import com.example.auto24.users.UserLoginRequest;
import com.example.auto24.users.UserRegistrationRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ALL
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request){
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }
    // ALL
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginRequest request, HttpServletResponse response) {
        authService.login(request, response);
        return ResponseEntity.ok("User logged in successfully");
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok("User logged out successfully");
    }
    // cur user or ADMIN
    @PostMapping("/{userId}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable("userId") String userId, @RequestBody ChangePasswordRequest request) {
        authService.changePassword(userId, request);
        return ResponseEntity.ok("Password changed successfully");
    }
    // cur user or ADMIN
    @GetMapping("/confirm")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String token) {
        authService.confirmEmail(token);
        return ResponseEntity.ok("Email confirmed");
    }
    // cur user or ADMIN
    @PostMapping("/forgot-password")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        authService.requestPasswordReset(email);
        return ResponseEntity.ok("Password reset link sent to your email");
    }
    // cur user or ADMIN
    @GetMapping("/reset-password")
    public ResponseEntity<String> validateResetPasswordToken(@RequestParam String token) {
        // Validate the token
        boolean isValid = authService.validateResetToken(token);
        if (!isValid) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }
        return ResponseEntity.ok("Token is valid. Please enter your new password.");
    }
    // cur user or ADMIN
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        // Reset the user's password
        authService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password has been reset successfully");
    }
}
