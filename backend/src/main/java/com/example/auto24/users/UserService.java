package com.example.auto24.users;

import com.example.auto24.auth.emailverificationToken.EmailVerificationToken;
import com.example.auto24.auth.emailverificationToken.EmailVerificationTokenRepository;
import com.example.auto24.cars.CarService;
import com.example.auto24.email.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UsersDTOMapper usersDTOMapper;
    private final CarService carService;
    private final PasswordEncoder encoder;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final EmailService emailService;
    private final UsersToDTO usersToDTO;

    public UserService(UserRepository userRepository, UsersDTOMapper usersDTOMapper, CarService carService, PasswordEncoder encoder, EmailVerificationTokenRepository emailVerificationTokenRepository, EmailService emailService, UsersToDTO usersToDTO) {
        this.userRepository = userRepository;
        this.usersDTOMapper = usersDTOMapper;
        this.carService = carService;
        this.encoder = encoder;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.emailService = emailService;
        this.usersToDTO = usersToDTO;
    }
    public List<UsersDTO> getAllUsers() {
        return userRepository.findAll().
                stream().map(usersDTOMapper).
                collect(Collectors.toList());
    }
    public UsersDTO getUserById(String UserId) {
        return userRepository.findById(UserId).
                map(usersDTOMapper).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
    public void deleteUser(String userId) {
        userRepository.findById(userId)
                .ifPresentOrElse(user -> {
                    carService.deleteCarsByUserId(userId);
                    userRepository.deleteById(user.getId());
                }, () -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
                });
    }
    public void assignAdminRoleToUser(String userId) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        user.setRole(Role.valueOf("ADMIN"));
        userRepository.save(user);
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

    public void register(UserRegistrationRequest request) {
        if (userRepository.existsByUsernameOrEmail(request.username(), request.email())) {
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

        sendVerificationEmail(user);
    }
    private void sendVerificationEmail(Users user) {
        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = EmailVerificationToken.builder()
                .token(token)
                .email(user.getEmail())
                .expiryDuration(86400000L)
                .createdAt(Instant.now())
                .isVerified(false)
                .build();
        emailVerificationTokenRepository.save(verificationToken);
        try {
            emailService.sendConfirmationEmail(user, token);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send confirmation email", e);
        }
    }
    public UsersDTO getUserProfile() {
        // Get the username from the security context (set by the JWT filter)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Fetch the user from the repository
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found for username: " + username);
        }

        return usersToDTO.map(user);
    }







}