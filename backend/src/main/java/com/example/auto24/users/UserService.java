package com.example.auto24.users;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final PasswordEncoder encoder;
    private final UsersDTOMapper usersDTOMapper;

    public UserService(UserRepository userRepository, AuthenticationManager authManager, PasswordEncoder encoder, UsersDTOMapper usersDTOMapper) {
        this.userRepository = userRepository;
        this.authManager = authManager;
        this.encoder = encoder;
        this.usersDTOMapper = usersDTOMapper;
    }


    public List<UsersDTO> getAllUsers() {
        return userRepository.findAll().stream().map(usersDTOMapper).collect(Collectors.toList());
    }

    public UsersDTO getUserById(String id) {
        return userRepository.findById(id).map(usersDTOMapper).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
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
    }
    public void login(UserLoginRequest request) {
        Users user = userRepository.findByUsername(request.username());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if (!encoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }
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