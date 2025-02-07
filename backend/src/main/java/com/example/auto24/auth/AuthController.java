package com.example.auto24.auth;

import com.example.auto24.users.ChangePasswordRequest;
import com.example.auto24.users.UserLoginRequest;
import com.example.auto24.users.UserRegistrationRequest;
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
    //all
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request){
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }
    //all
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@Valid @RequestBody UserLoginRequest request) {
        return authService.login(request);
    }
    //CURRENT USER OR ADMIN
    @PostMapping("/{userId}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable("userId") String userId, @RequestBody ChangePasswordRequest request) {
        authService.changePassword(userId, request);
        return ResponseEntity.ok("Password changed successfully");
    }

    //to do
    //Unvalidate the token after confirmation
    //CURRENT USER
    @GetMapping("/confirm")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String token) {
        authService.confirmEmail(token);
        return ResponseEntity.ok("Email confirmed");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        authService.requestPasswordReset(email);
        return ResponseEntity.ok("Password reset link sent to your email");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        authService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password has been reset successfully");
    }
}
