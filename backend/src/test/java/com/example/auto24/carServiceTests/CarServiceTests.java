package com.example.auto24.carServiceTests;

import com.example.auto24.cars.*;
import com.example.auto24.cars.extra_info.CarExtraInfoDTO;
import com.example.auto24.users.UserPrincipal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.auto24.cars.extra_info.CarExtraInfoService;
import com.example.auto24.users.SecurityUtils;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CarServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CarRepository carRepository;

    @Mock
    private CarDetailsService carDetailsService;

    @Mock
    private CarExtraInfoService carExtraInfoService;

    @InjectMocks
    private CarService carService;

    private Users mockUser;
    private Car mockCar;

    @BeforeEach
    void setUp() {
        mockUser = new Users();
        mockUser.setId("user123");
        mockUser.setCarIds(new ArrayList<>());

        mockCar = Car.builder()
                .id("car123")
                .ownerId("user123")
                .imageKeys(List.of())
                .createdAt(LocalDateTime.now())
                .expirationDate(LocalDateTime.now().plusMonths(1))
                .isActive(true)
                .build();
    }

    @Test
    void deleteCarsByUserId_ShouldDeleteAllCarsForUser() {
        when(carRepository.findByOwnerId("user123")).thenReturn(List.of(mockCar));

        carService.deleteCarsByUserId("user123");

        verify(carRepository, times(1)).deleteById("car123");
    }

    @Test
    void deleteCarListing_ShouldDeleteCarAndUpdateUser() {
        // Create a mock UserPrincipal
        UserPrincipal mockUserPrincipal = mock(UserPrincipal.class);
        when(mockUserPrincipal.getUserId()).thenReturn("user123");

        // Manually set up the security context
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(mockUserPrincipal, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Setup mocks
        when(carRepository.findByOwnerId("user123")).thenReturn(List.of(mockCar));
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));

        // Execute the method
        carService.deleteCarListing("car123");

        // Verify interactions
        verify(carDetailsService).deleteCarDetailsByCarId("car123");
        verify(carExtraInfoService).deleteCarExtraInfoByCarId("car123");
        verify(carRepository).deleteById("car123");
        verify(userRepository).save(mockUser);
        assertTrue(mockUser.getCarIds().isEmpty());

        // Clear the security context after the test
        SecurityContextHolder.clearContext();
    }

    @Test
    void createCarListing_ShouldCreateCarAndUpdateUser() {
        // Create a mock UserPrincipal
        UserPrincipal mockUserPrincipal = mock(UserPrincipal.class);
        when(mockUserPrincipal.getUserId()).thenReturn("user123");

        // Manually set up the security context
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(mockUserPrincipal, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Mock the request and repository interactions
        CarListingRequest request = mock(CarListingRequest.class);
        when(userRepository.findById("user123")).thenReturn(Optional.of(mockUser));
        when(carRepository.save(any(Car.class))).thenReturn(mockCar);

        // Execute the method
        String carId = carService.createCarListing(request);

        // Verify interactions and results
        assertEquals("car123", carId);
        verify(carDetailsService).createAndSaveCarDetails(eq("car123"), any());
        verify(carExtraInfoService).createAndSaveCarExtraInfo(eq("car123"), any());
        verify(userRepository).save(mockUser);
        assertTrue(mockUser.getCarIds().contains("car123"));

        // Clear the security context after the test
        SecurityContextHolder.clearContext();
    }

    @Test
    void extendCarExpirationDate_ShouldUpdateExpirationDate() {
        // Arrange
        LocalDateTime originalExpirationDate = LocalDateTime.now().plusMonths(1);
        mockCar.setExpirationDate(originalExpirationDate);
        when(carRepository.findById("car123")).thenReturn(Optional.of(mockCar));

        // Act
        carService.extendCarExpirationDate("car123", 3);

        // Assert
        LocalDateTime expectedExpirationDate = originalExpirationDate.plusMonths(3);
        assertEquals(expectedExpirationDate, mockCar.getExpirationDate());
        verify(carRepository).save(mockCar);
    }

    @Test
    void getCarListingById_ShouldReturnCarListing() {
        when(carDetailsService.getCarDetailsById("car123")).thenReturn(Optional.of(mock(CarDetailsDTO.class)));
        when(carExtraInfoService.getCarExtraInfoByCarId("car123")).thenReturn(Optional.of(mock(CarExtraInfoDTO.class)));

        Optional<CarListingResponse> result = carService.getCarListingById("car123");

        assertTrue(result.isPresent());
    }

    @Test
    void toggleCarListingStatus_ShouldToggleActiveStatus() {
        when(carRepository.findById("car123")).thenReturn(Optional.of(mockCar));

        boolean newStatus = carService.toggleCarListingStatus("car123");

        assertFalse(mockCar.isActive());
        assertTrue(newStatus == false);
        verify(carRepository).save(mockCar);
    }

    @Test
    void findUserIdFromCarId_ShouldReturnOwnerId() {
        when(carRepository.findById("car123")).thenReturn(Optional.of(mockCar));

        String ownerId = carService.findUserIdFromCarId("car123");

        assertEquals("user123", ownerId);
    }

    @Test
    void getOwnerOtherSales_ShouldReturnOtherActiveCars() {
        List<Car> ownerCars = List.of(
                Car.builder().id("car456").ownerId("user123").isActive(true).build(),
                Car.builder().id("car789").ownerId("user123").isActive(true).build()
        );

        when(carRepository.findById("car123")).thenReturn(Optional.of(mockCar));
        when(carRepository.findByOwnerId("user123")).thenReturn(ownerCars);
        when(carDetailsService.createCarPreviewDTO(any())).thenReturn(mock(CarPreviewDTO.class));

        List<CarPreviewDTO> otherSales = carService.getOwnerOtherSales("car123");

        assertFalse(otherSales.isEmpty());
        verify(carDetailsService, times(2)).createCarPreviewDTO(any());
    }
}