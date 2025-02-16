package com.example.auto24.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    //methods for logged in user.

    @DeleteMapping("")
    public ResponseEntity<?> deleteUser() {
        userService.deleteUser();
        return ResponseEntity.ok("User deleted successfully");
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserDataRequest userDataRequest) {
        userService.updateUser(userDataRequest);
        return ResponseEntity.ok("User updated successfully");
    }
    @GetMapping("/me")
    public ResponseEntity<UsersDTO> getCurrentUser() {
        UsersDTO userProfile = userService.getUserProfile();
        return ResponseEntity.ok(userProfile);
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        userService.changePassword(request);
        return ResponseEntity.ok("Password changed successfully");
    }


}