package com.example.auto24.users;

import com.example.auto24.cars.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UsersDTOMapper usersDTOMapper;
    private final CarService carService;

    public UserService(UserRepository userRepository, UsersDTOMapper usersDTOMapper, CarService carService) {
        this.userRepository = userRepository;
        this.usersDTOMapper = usersDTOMapper;
        this.carService = carService;
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
}