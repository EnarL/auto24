package com.example.auto24.users;

import com.example.auto24.cars.CarService;
import com.example.auto24.email.EmailService;
import com.example.auto24.jwt.AuthService;
import com.example.auto24.jwt.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UsersDTOMapper usersDTOMapper;
    private final CarService carService;
    private final EmailService emailService;
    private final AuthService authService;
    private final JWTUtil jwtUtil;

    public UserService(UserRepository userRepository, PasswordEncoder encoder, UsersDTOMapper usersDTOMapper, CarService carService, EmailService emailService, AuthService authService, JWTUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.usersDTOMapper = usersDTOMapper;
        this.carService = carService;
        this.emailService = emailService;
        this.authService = authService;
        this.jwtUtil = jwtUtil;
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

    public void register(UserRegistrationRequest request) {
        if (userRepository.findByUsername(request.username()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        if (userRepository.findByEmail(request.email()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
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

    public ResponseEntity<Map<String, String>> login(UserLoginRequest request) {
        return authService.login(request);
    }

    public void deleteUser(String UserId) {
        userRepository.findById(UserId)
                .ifPresentOrElse(user -> {
                    carService.deleteCarsByUserId(UserId);
                    userRepository.deleteById(user.getId());
                }, () -> {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
                });
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
}