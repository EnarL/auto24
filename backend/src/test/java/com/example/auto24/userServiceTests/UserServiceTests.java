package com.example.auto24.userServiceTests;

import com.example.auto24.MockUserGenerator;
import com.example.auto24.auth.emailverificationToken.EmailVerificationToken;
import com.example.auto24.auth.emailverificationToken.EmailVerificationTokenRepository;
import com.example.auto24.cars.CarService;
import com.example.auto24.email.EmailService;
import com.example.auto24.users.*;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UsersDTOMapper usersDTOMapper;

    @Mock
    private CarService carService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private UserDataUpdateMapper userDataUpdateMapper;

    @InjectMocks
    private UserService userService;

    private Users mockUser;
    private UserPrincipal mockUserPrincipal;

    @BeforeEach
    void setUp() {
        mockUser = MockUserGenerator.createMockUser();
        mockUserPrincipal = new UserPrincipal(mockUser);

        // Setup security context
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(mockUserPrincipal, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    void changePassword_ShouldUpdatePasswordSuccessfully() {
        // Arrange
        when(userRepository.findByUsername(mockUser.getUsername())).thenReturn(mockUser);
        when(passwordEncoder.matches(any(), any())).thenReturn(true);
        when(passwordEncoder.encode(any())).thenReturn("encodedNewPassword");

        ChangePasswordRequest request = new ChangePasswordRequest(
                mockUser.getPassword(),
                "newPassword",
                "newPassword"
        );

        // Act
        userService.changePassword(request);

        // Assert
        verify(userRepository).save(mockUser);
        verify(passwordEncoder).encode("newPassword");
    }

    @Test
    void register_ShouldCreateNewUser() throws MessagingException {
        // Arrange
        when(userRepository.existsByUsernameOrEmail(any(), any())).thenReturn(false);

        UserRegistrationRequest request = new UserRegistrationRequest(
                "newuser",
                "password",
                "John",
                "Doe",
                "john.doe@example.com",
                false
        );

        // Act
        userService.register(request);

        // Assert
        verify(userRepository).save(any(Users.class));
        verify(emailVerificationTokenRepository).save(any(EmailVerificationToken.class));
        verify(emailService).sendConfirmationEmail(any(), any());
    }

    @Test
    void getUserProfile_ShouldReturnUserDTO() {
        // Arrange
        when(userRepository.findByUsername(mockUser.getUsername())).thenReturn(mockUser);
        UsersDTO expectedDTO = new UsersDTO(
                mockUser.getUsername(),
                mockUser.getEmail(),
                mockUser.getFirstname(),
                mockUser.getLastname(),
                mockUser.getPhoneNumber(),
                mockUser.isNewsletter(),
                mockUser.getCarIds(),
                mockUser.isActive()

        );
        when(usersDTOMapper.apply(mockUser)).thenReturn(expectedDTO);

        // Act
        UsersDTO result = userService.getUserProfile();

        // Assert
        assertEquals(expectedDTO, result);
    }

    @Test
    void updateUser_ShouldUpdateUserDetails() {
        // Arrange
        when(userRepository.findByUsername(mockUser.getUsername())).thenReturn(mockUser);
        UpdateUserDataRequest updateRequest = mock(UpdateUserDataRequest.class);

        // Act
        userService.updateUser(updateRequest);

        // Assert
        verify(userDataUpdateMapper).updateUserDetailsFromDto(updateRequest, mockUser);
        verify(userRepository).save(mockUser);
    }



    @Test
    void getSalesmanInfo_ShouldReturnSalesmanDTO() {
        // Arrange
        String carId = "car123";
        when(carService.findUserIdFromCarId(carId)).thenReturn(mockUser.getId());
        when(userRepository.findById(mockUser.getId())).thenReturn(Optional.of(mockUser));

        // Act
        SalesmanDTO result = userService.getSalesmanInfo(carId);

        // Assert
        assertEquals(mockUser.getFirstname(), result.firstname());
        assertEquals(mockUser.getEmail(), result.email());
        assertEquals(mockUser.getPhoneNumber(), result.phoneNumber());
    }

    @Test
    void deleteUser_ShouldDeleteUserAndCars() {
        when(userRepository.findByUsername(mockUser.getUsername())).thenReturn(mockUser);

        // Act
        userService.deleteUser();

        // Assert
        verify(userRepository).delete(mockUser);  // Verify the deletion of the user
        verify(carService).deleteCarsByUserId(mockUser.getId());  // Verify car deletion linked to the user
    }


    @Test
    void changePassword_ShouldThrowException_WhenCurrentPasswordIsIncorrect() {
        // Arrange
        when(userRepository.findByUsername(mockUser.getUsername())).thenReturn(mockUser);
        when(passwordEncoder.matches(any(), any())).thenReturn(false);  // Simulate incorrect password

        ChangePasswordRequest request = new ChangePasswordRequest(
                "wrongPassword",  // Set wrong password
                "newPassword",
                "newPassword"
        );

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> userService.changePassword(request), "Current password is incorrect");
    }

    @Test
    void register_ShouldThrowException_WhenUserAlreadyExists() {
        // Arrange
        when(userRepository.existsByUsernameOrEmail(any(), any())).thenReturn(true);  // Simulate existing user

        UserRegistrationRequest request = new UserRegistrationRequest(
                "existinguser",  // Username that already exists
                "password",
                "John",
                "Doe",
                "john.doe@example.com",
                false
        );

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> userService.register(request), "User already exists");
    }

    // Clean up security context after each test
    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }
}