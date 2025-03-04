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
    @GetMapping("{id}")
    public ResponseEntity<UsersDTO> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(adminService.getUserById(id));
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
