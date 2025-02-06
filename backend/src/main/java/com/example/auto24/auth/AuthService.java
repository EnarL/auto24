package com.example.auto24.auth;

import com.example.auto24.email.EmailService;
import com.example.auto24.users.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final EmailService emailService;

    public AuthService(AuthenticationManager authenticationManager, JWTUtil jwtUtil, UserRepository userRepository, PasswordEncoder encoder, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.emailService = emailService;
    }

    public ResponseEntity<Map<String, String>> login(UserLoginRequest request) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Users user = userRepository.findByUsername(userDetails.getUsername());
        String token = jwtUtil.generateToken(user.getId(), userDetails.getUsername());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
    public void changePassword(String userId, ChangePasswordRequest request) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!encoder.matches(request.currentPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current password is incorrect");
        }

        if (!request.newPassword().equals(request.confirmationPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New password and confirmation password do not match");
        }

        user.setPassword(encoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    public void confirmEmail(String token) {
        String userId = jwtUtil.extractUserId(token);
        Users user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token"));
        user.setActive(true);
        userRepository.save(user);
    }
    public void register(UserRegistrationRequest request) {
        boolean userExists = userRepository.findByUsername(request.username()) != null ||
                userRepository.findByEmail(request.email()) != null;
        if (userExists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with provided credentials already exists");
        }
        Users user = Users.builder()
                .username(request.username())
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(encoder.encode(request.password()))
                .newsletter(request.newsletter())
                .active(false)
                .build();
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getId(), user.getUsername());
        emailService.sendConfirmationEmail(user, token);
    }

}
