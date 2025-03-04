package com.example.auto24.adminServiceTests;

import com.example.auto24.MockUserGenerator;
import com.example.auto24.admin.AdminService;
import com.example.auto24.cars.CarService;
import com.example.auto24.users.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UsersDTOMapper usersDTOMapper;

    @Mock
    private CarService carService;

    @InjectMocks
    private AdminService adminService;

    private Users mockUser;
    private UsersDTO mockUserDTO;

    @BeforeEach
    void setUp() {
        // Create a mock user using MockUserGenerator
        mockUser = MockUserGenerator.createMockUser();

        // Create a corresponding mock UserDTO
        mockUserDTO = new UsersDTO(
                mockUser.getUsername(),
                mockUser.getFirstname(),
                mockUser.getLastname(),
                mockUser.getEmail(),
                mockUser.getPhoneNumber(),
                mockUser.isNewsletter(),
                mockUser.getCarIds(),
                mockUser.isActive()
        );

        // Set up admin authentication for tests
        TestingAuthenticationToken authentication = new TestingAuthenticationToken(
                "admin",
                "password",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    void getAllUsers_ShouldReturnListOfUsersDTO() {
        // Arrange
        List<Users> mockUsers = Arrays.asList(mockUser);
        when(userRepository.findAll()).thenReturn(mockUsers);
        when(usersDTOMapper.apply(mockUser)).thenReturn(mockUserDTO);

        // Act
        List<UsersDTO> result = adminService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(mockUserDTO, result.get(0));
        verify(userRepository).findAll();
    }

    @Test
    void getUserById_ExistingUser_ShouldReturnUsersDTO() {
        // Arrange
        when(userRepository.findById(mockUser.getId())).thenReturn(Optional.of(mockUser));
        when(usersDTOMapper.apply(mockUser)).thenReturn(mockUserDTO);

        // Act
        UsersDTO result = adminService.getUserById(mockUser.getId());

        // Assert
        assertNotNull(result);
        assertEquals(mockUserDTO, result);
        verify(userRepository).findById(mockUser.getId());
    }

    @Test
    void getUserById_NonExistingUser_ShouldThrowRuntimeException() {
        // Arrange
        when(userRepository.findById("999")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> adminService.getUserById("999"));
    }

    @Test
    void deleteUser_ExistingUser_ShouldDeleteUserAndCars() {
        // Arrange
        when(userRepository.findById(mockUser.getId())).thenReturn(Optional.of(mockUser));
        doNothing().when(carService).deleteCarsByUserId(mockUser.getId());
        doNothing().when(userRepository).deleteById(mockUser.getId());

        // Act
        adminService.deleteUser(mockUser.getId());

        // Assert
        verify(carService).deleteCarsByUserId(mockUser.getId());
        verify(userRepository).deleteById(mockUser.getId());
    }

    @Test
    void deleteUser_NonExistingUser_ShouldThrowResponseStatusException() {
        // Arrange
        when(userRepository.findById("999")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> adminService.deleteUser("999"));
    }

    @Test
    void assignAdminRoleToUser_ExistingUser_ShouldUpdateUserRole() {
        // Arrange
        Users userToBeUpdated = MockUserGenerator.createMockUser();
        when(userRepository.findById(userToBeUpdated.getId())).thenReturn(Optional.of(userToBeUpdated));
        when(userRepository.save(userToBeUpdated)).thenReturn(userToBeUpdated);

        // Act
        adminService.assignAdminRoleToUser(userToBeUpdated.getId());

        // Assert
        assertEquals(Role.ADMIN, userToBeUpdated.getRole());
        verify(userRepository).save(userToBeUpdated);
    }

    @Test
    void assignAdminRoleToUser_NonExistingUser_ShouldThrowResponseStatusException() {
        // Arrange
        when(userRepository.findById("999")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> adminService.assignAdminRoleToUser("999"));
    }
}