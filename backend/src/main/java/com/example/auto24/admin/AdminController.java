package com.example.auto24.admin;


import com.example.auto24.users.UsersDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
private final AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    @GetMapping
    public List<UsersDTO> getAllUsers() {
        return adminService.getAllUsers();
    }
    @GetMapping("/{userId}")
    public UsersDTO getUserById(@PathVariable("userId") String userId) {
        return adminService.getUserById(userId);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }
    @PutMapping("/assignAdmin/{userId}")
    public ResponseEntity<String> assignAdminRoleToUser(@PathVariable String userId) {
        adminService.assignAdminRoleToUser(userId);
        return ResponseEntity.ok("Admin role assigned to user");
    }
}
