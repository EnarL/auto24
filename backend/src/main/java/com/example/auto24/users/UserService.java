package com.example.auto24.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    AuthenticationManager authManager;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public Users register(Users user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public Users loginUser(String username, String password) {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if (!encoder.matches(password, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }
        return user;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}