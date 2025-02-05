package com.example.auto24.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UsersDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public UsersDTO getUserById(@PathVariable("userId") String userId) {
        return userService.getUserById(userId);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest request){
        userService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody UserLoginRequest request) {
        return userService.login(request);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId, @RequestHeader("Authorization") String authorizationHeader) throws AccessDeniedException {
        if (authorizationHeader == null){
            return ResponseEntity.badRequest().body("Missing token");
        }
        String tokenUserId = userService.extractUserIdFromToken(authorizationHeader);
        String role = userService.extractRoleFromToken(authorizationHeader);


        if (!tokenUserId.equals(userId) && !role.equals("ADMIN")){
            throw new AccessDeniedException("You are not authorized");
        }
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
    @PostMapping("/{userId}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable("userId") String userId, @RequestBody ChangePasswordRequest request, @RequestHeader("Authorization") String authorizationHeader) throws AccessDeniedException {
        if (authorizationHeader == null){
            return ResponseEntity.badRequest().body("Missing token");
        }
        String tokenUserId = userService.extractUserIdFromToken(authorizationHeader);
        String role = userService.extractRoleFromToken(authorizationHeader);


        if (!tokenUserId.equals(userId) && !role.equals("ADMIN")){
            throw new AccessDeniedException("You are not authorized");
        }
        userService.changePassword(userId, request);
        return ResponseEntity.ok("Password changed successfully");
    }

    //to do
    //Unvalidate the token after confirmation

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String token) {
        userService.confirmEmail(token);
        return ResponseEntity.ok("Email confirmed");
    }
    @PutMapping("/createAdmin")
    public ResponseEntity<String> assignAdminRoleToUser(String userId) {
        userService.assignAdminRoleToUser(userId);
        return ResponseEntity.ok("Admin role assigned to user");

    }

}