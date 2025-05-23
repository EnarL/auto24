package com.example.auto24.users;
import com.amazonaws.services.kms.model.NotFoundException;
import com.example.auto24.auth.emailverificationToken.EmailVerificationToken;
import com.example.auto24.auth.emailverificationToken.EmailVerificationTokenRepository;
import com.example.auto24.cars.CarService;
import com.example.auto24.email.EmailService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UsersDTOMapper usersDTOMapper;
    private final CarService carService;
    private final PasswordEncoder encoder;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final EmailService emailService;
    private final UserDataUpdateMapper userDataUpdateMapper;

    public UserService(UserRepository userRepository, UsersDTOMapper usersDTOMapper, CarService carService, PasswordEncoder encoder, EmailVerificationTokenRepository emailVerificationTokenRepository, EmailService emailService, UserDataUpdateMapper userDataUpdateMapper) {
        this.userRepository = userRepository;
        this.usersDTOMapper = usersDTOMapper;
        this.carService = carService;
        this.encoder = encoder;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.emailService = emailService;
        this.userDataUpdateMapper = userDataUpdateMapper;
    }

    public void changePassword(ChangePasswordRequest request) {
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated"));

        Users user = userRepository.findByUsername(userPrincipal.getUsername());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (!encoder.matches(request.currentPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current password is incorrect");
        }

        if (!request.newPassword().equals(request.confirmationPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New password and confirmation password do not match");
        }
        if (request.newPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must have minimum 8 characters");
        }

        user.setPassword(encoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    public void register(UserRegistrationRequest request) {
        if (request.username().length() < 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username must be at least 3 characters long");
        }

        if (request.password().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters long");
        }

        if (!request.password().equals(request.confirmationPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password and confirmation password do not match");
        }

        if (userRepository.existsByUsername(request.username())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this username already exists");
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists");
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

        if (request.newsletter()) {
            emailService.sendNewsLetterEmail(user);
        }

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
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated"));

        Users user = userRepository.findByUsername(userPrincipal.getUsername());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        return usersDTOMapper.apply(user);
    }


    public void updateUser(UpdateUserDataRequest updateUserDataRequest) {
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated"));

        Users user = userRepository.findByUsername(userPrincipal.getUsername());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        userDataUpdateMapper.updateUserDetailsFromDto(updateUserDataRequest, user);
        userRepository.save(user);
    }


    public void deleteUser() {
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated"));

        Users user = userRepository.findByUsername(userPrincipal.getUsername());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }


        userRepository.delete(user);
        carService.deleteCarsByUserId(user.getId());
    }


    public SalesmanDTO getSalesmanInfo(String carId) {
        String ownerId = carService.findUserIdFromCarId(carId);

        return userRepository.findById(ownerId)
                .map(user -> new SalesmanDTO(
                        user.getFirstname(),
                        user.getEmail(),
                        user.getPhoneNumber()
                ))
                .orElseThrow(() -> new NotFoundException("User not found with ID: " + ownerId));
    }

}