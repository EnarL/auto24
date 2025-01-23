package com.example.auto24.users;

import com.example.auto24.config.MyUserDetailsService;
import com.example.auto24.email.EmailSender;
import com.example.auto24.jwt.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final UsersDTOMapper usersDTOMapper;
    private final MyUserDetailsService userDetailsService;
    private final JWTUtil jwtUtil;
    private final EmailSender emailSender;
    public UserService(UserRepository userRepository, AuthenticationManager authenticationManager, PasswordEncoder encoder, UsersDTOMapper usersDTOMapper, MyUserDetailsService userDetailsService, JWTUtil jwtUtil, EmailSender emailSender) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.usersDTOMapper = usersDTOMapper;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.emailSender = emailSender;
    }


    public List<UsersDTO> getAllUsers() {
        return userRepository.findAll().
                stream().map(usersDTOMapper).
                collect(Collectors.toList());
    }

    public UsersDTO getUserById(String id) {
        return userRepository.findById(id).
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
                .build();
        userRepository.save(user);
        // Send confirmation email
        String emailContent = "Dear " + user.getFirstname() + ",\n\nThank you for registering. Please confirm your email address by clicking the link below:\n\n[Confirmation Link]\n\nBest regards,\nAuto24 Team";
        emailSender.send(user.getEmail(), emailContent);
    }
    public String login(UserLoginRequest request) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(userDetails.getUsername());
    }
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public void changePassword(String userId, ChangePasswordRequest request) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (!encoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New password and confirmation password do not match");
        }

        user.setPassword(encoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}