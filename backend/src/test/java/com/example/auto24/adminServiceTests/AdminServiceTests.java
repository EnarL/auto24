package com.example.auto24.adminServiceTests;

import com.example.auto24.admin.AdminService;
import com.example.auto24.cars.CarService;
import com.example.auto24.users.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTests {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UsersDTOMapper usersDTOMapper;

    @Mock
    private CarService carService;

    @InjectMocks
    private AdminService adminService;

    private Users user;
    private UsersDTO userDTO;

    @BeforeEach
    void setUp() {
        user = new Users();
        user.setId("123");
        user.setRole(Role.USER);
        userDTO = new UsersDTO(
                "testuser",
                "test",
                "user",
                "test@example.com",
                "1234567890",
               true,
               null,
               false
        );
    }

    @Test
    void getAllUsers_ShouldReturnListOfUsers() {
        when(userRepository.findAll()).thenReturn(List.of(user));
        when(usersDTOMapper.apply(user)).thenReturn(userDTO);

        List<UsersDTO> result = adminService.getAllUsers();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        when(userRepository.findById("123")).thenReturn(Optional.of(user));
        when(usersDTOMapper.apply(user)).thenReturn(userDTO);

        UsersDTO result = adminService.getUserById("123");

        assertNotNull(result);
        verify(userRepository, times(1)).findById("123");
    }

    @Test
    void getUserById_ShouldThrowException_WhenUserNotFound() {
        when(userRepository.findById("123")).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> adminService.getUserById("123"));
    }

    @Test
    void deleteUser_ShouldDeleteUser_WhenUserExists() {
        when(userRepository.findById("123")).thenReturn(Optional.of(user));
        doNothing().when(carService).deleteCarsByUserId("123");
        doNothing().when(userRepository).deleteById("123");

        adminService.deleteUser("123");

        verify(carService, times(1)).deleteCarsByUserId("123");
        verify(userRepository, times(1)).deleteById("123");
    }

    @Test
    void deleteUser_ShouldThrowException_WhenUserNotFound() {
        when(userRepository.findById("123")).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> adminService.deleteUser("123"));
    }

    @Test
    void assignAdminRoleToUser_ShouldAssignAdminRole_WhenUserExists() {
        when(userRepository.findById("123")).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        adminService.assignAdminRoleToUser("123");

        assertEquals(Role.ADMIN, user.getRole());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void assignAdminRoleToUser_ShouldThrowException_WhenUserNotFound() {
        when(userRepository.findById("123")).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> adminService.assignAdminRoleToUser("123"));
    }
}