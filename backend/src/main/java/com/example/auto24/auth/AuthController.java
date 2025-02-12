package com.example.auto24.auth;

import com.example.auto24.auth.emailverificationToken.EmailVerificationService;
import com.example.auto24.auth.prtoken.PasswordResetService;
import com.example.auto24.users.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final PasswordResetService passwordResetService;
    private final EmailVerificationService emailVerificationService;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, PasswordResetService passwordResetService, EmailVerificationService emailVerificationService, UserService userService, JWTUtil jwtUtil, TokenService tokenService, UserRepository userRepository) {
        this.authService = authService;
        this.passwordResetService = passwordResetService;
        this.emailVerificationService = emailVerificationService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    // ALL
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request){
        userService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }
    // ALL
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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
        userService.changePassword(userId, request);
        return ResponseEntity.ok("Password changed successfully");
    }
    // cur user or ADMIN
    @GetMapping("/confirm")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String token) {
        emailVerificationService.confirmEmail(token);
        return ResponseEntity.ok("Email confirmed");
    }
    // cur user or ADMIN
    @PostMapping("/forgot-password")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        passwordResetService.requestPasswordReset(email);
        return ResponseEntity.ok("Password reset link sent to your email");
    }
    // cur user or ADMIN
    @GetMapping("/reset-password")
    public ResponseEntity<String> validateResetPasswordToken(@RequestParam String token) {
        passwordResetService.validateResetToken(token);
        return ResponseEntity.ok("Token is valid. Please enter your new password.");
    }

    // cur user or ADMIN
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password has been reset successfully");
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
        if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Refresh token is missing or invalid.");
        }
        String username = jwtUtil.extractUserName(refreshToken);
        String newAccessToken = jwtUtil.generateToken(username);
        tokenService.addCookie(response, "accessToken", newAccessToken, 900, true, "Strict");

        return ResponseEntity.ok("Access token refreshed.");
    }

    @GetMapping("/check-session")
    public String checkSession(HttpServletRequest request) {
        // Extract the access token from cookies
        String accessToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("accessToken".equals(cookie.getName())) {
                    accessToken = cookie.getValue();
                    break;
                }
            }
        }

        if (accessToken != null && jwtUtil.validateToken(accessToken)) {
            String username = jwtUtil.extractUserName(accessToken);
            Users user = userRepository.findByUsername(username);

            if (user != null) {
                return "User is logged in with username: " + username;
            }
        }
        return "User is not logged in";
    }

}
