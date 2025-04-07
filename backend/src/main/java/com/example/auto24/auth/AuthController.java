package com.example.auto24.auth;

import com.example.auto24.auth.emailverificationToken.EmailVerificationService;
import com.example.auto24.auth.prtoken.PasswordResetService;
import com.example.auto24.users.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final PasswordResetService passwordResetService;
    private final EmailVerificationService emailVerificationService;
    private final UserService userService;
    private final TokenService tokenService;
    private final String frontendUrl;

    public AuthController(AuthService authService, PasswordResetService passwordResetService, EmailVerificationService emailVerificationService, UserService userService, TokenService tokenService,
                          @Value("${APP_FRONTEND_URL}") String frontendUrl) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
        this.emailVerificationService = emailVerificationService;
        this.userService = userService;
        this.tokenService = tokenService;
        this.frontendUrl = frontendUrl;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request){
        userService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginRequest request, HttpServletResponse response) {
        authService.login(request, response);
        return ResponseEntity.ok("User logged in successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok("User logged out successfully");
    }

    @GetMapping("/confirm")
    public ResponseEntity<Void> confirmEmail(@RequestParam("token") String token, HttpServletResponse response) {
        emailVerificationService.confirmEmail(token);
        response.setHeader("Location", frontendUrl+ "/login?confirmed=true");
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        passwordResetService.requestPasswordReset(email);
        return ResponseEntity.ok("Password reset link sent to your email");
    }
    @GetMapping("/reset-password")
    public ResponseEntity<String> validateResetPasswordToken(@RequestParam String token) {
        passwordResetService.validateResetToken(token);
        return ResponseEntity.ok("Token is valid. Please enter your new password.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody ResetPasswordRequest request) {
        passwordResetService.resetPassword(token, request);
        return ResponseEntity.ok("Password has been reset successfully");
    }
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletResponse response) {
        tokenService.refreshToken(response);
        return ResponseEntity.ok("Access token refreshed.");
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpServletRequest request) {
        authService.checkSession(request);
      return ResponseEntity.ok("Session is valid");
    }

}
