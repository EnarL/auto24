package com.example.auto24.users;
import com.example.auto24.auth.emailverificationToken.EmailVerificationToken;
import com.example.auto24.auth.emailverificationToken.EmailVerificationTokenRepository;
import com.example.auto24.cars.CarService;
import com.example.auto24.email.EmailService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
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

    public void changePassword( ChangePasswordRequest request) {
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser();
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

        user.setPassword(encoder.encode(request.newPassword()));
        userRepository.save(user);
    }
    @Transactional
    public void register(UserRegistrationRequest request) {
        if (userRepository.existsByUsernameOrEmail(request.username(), request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with provided credentials already exists");
        }
        Users user = Users.builder().username(request.username())
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
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser();
        Users user = userRepository.findByUsername(userPrincipal.getUsername());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return usersDTOMapper.apply(user);
    }

    public void updateUser(UpdateUserDataRequest updateUserDataRequest) {
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser();
        Users user = userRepository.findByUsername(userPrincipal.getUsername());
        userDataUpdateMapper.updateUserDetailsFromDto(updateUserDataRequest, user);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userRepository.save(user);
    }

    public void deleteUser() {
        UserPrincipal userPrincipal = SecurityUtils.getAuthenticatedUser();
        Users user = userRepository.findByUsername(userPrincipal.getUsername());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        userRepository.delete(user);
        carService.deleteCarsByUserId(user.getId());
    }
}