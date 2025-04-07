package com.example.auto24.users;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

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
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<UsersDTO> getCurrentUser() {
        return ResponseEntity.ok(userService.getUserProfile());
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        userService.changePassword(request);
        return ResponseEntity.ok("Password changed successfully");
    }
    @GetMapping("/SalesmanInfo/{CarId}")
    public SalesmanDTO getSalesmanInfo(@PathVariable  String CarId){
        return  userService.getSalesmanInfo(CarId);
    }
}
