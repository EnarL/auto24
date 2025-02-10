package com.example.auto24.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    //admin
    @GetMapping
    public List<UsersDTO> getAllUsers() {
        return userService.getAllUsers();
    }
    //admin or the current user
    @GetMapping("/{userId}")
    public UsersDTO getUserById(@PathVariable("userId") String userId) {
        return userService.getUserById(userId);
    }
    //current user or ADMIN
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
    //ADMIN
    @PutMapping("/assignAdmin/{userId}")
    public ResponseEntity<String> assignAdminRoleToUser(@PathVariable String userId) {
        userService.assignAdminRoleToUser(userId);
        return ResponseEntity.ok("Admin role assigned to user");

    }
    @GetMapping("/me")
    public ResponseEntity<UsersDTO> getCurrentUser() {
        UsersDTO userProfile = userService.getUserProfile();
        return ResponseEntity.ok(userProfile);
    }


}