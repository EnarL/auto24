package com.example.auto24.carExtraInfoServiceTests;

import com.example.auto24.cars.extra_info.*;
import com.example.auto24.cars.extra_info.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CarExtraInfoServiceTests {

    @Mock
    private CarExtraInfoRepository carExtraInfoRepository;

    @Mock
    private CarExtraInfoDTOMapper carExtraInfoDTOMapper;

    @Mock
    private CarExtraInfoMapper carExtraInfoMapper;

    @InjectMocks
    private CarExtraInfoService carExtraInfoService;

    private CarExtraInfoDTO mockCarExtraInfoDTO;
    private CarExtraInfo mockCarExtraInfo;
    private String carId;

    @BeforeEach
    void setUp() {
        // Initialize carId for testing
        carId = "car123";

        // Initialize all sub-entities with mock data
        SafetyAndSecurity safetyAndSecurity = new SafetyAndSecurity();
        safetyAndSecurity.setAbsPidurid(true);
        safetyAndSecurity.setAutomaatpidurdussüsteem(true);

        Lights lights = new Lights();
        lights.setLed(true);

        TiresAndWheels tiresAndWheels = new TiresAndWheels();
        tiresAndWheels.setIlukilbid(true);

        Steering steering = new Steering();
        steering.setKäiguvahetusRoolilt(true);

        Seats seats = new Seats();
        seats.setIstmesoojendused(true);

        InteriorFeatures interiorFeatures = new InteriorFeatures();
        interiorFeatures.setJalamatid(true);

        SportFeatures sportFeatures = new SportFeatures();
        sportFeatures.setEsispoiler(true);

        Comfort comfortFeatures = new Comfort();
        comfortFeatures.setAutomaatseltTumenevadPeeglid(true);

        AudioVideoCommunication audioVideoCommunication = new AudioVideoCommunication();
        audioVideoCommunication.setStereo(true);

        Additional additional = new Additional();
        additional.setReguleeritavVedrustus(true);

        // Create CarExtraInfoDTO
        mockCarExtraInfoDTO = new CarExtraInfoDTO(
                safetyAndSecurity,
                lights,
                tiresAndWheels,
                steering,
                seats,
                interiorFeatures,
                sportFeatures,
                comfortFeatures,
                audioVideoCommunication,
                additional
        );

        // Create the corresponding CarExtraInfo entity
        mockCarExtraInfo = new CarExtraInfo();
        mockCarExtraInfo.setCarId(carId);
        mockCarExtraInfo.setSafetyAndSecurity(safetyAndSecurity);
        mockCarExtraInfo.setLights(lights);
        mockCarExtraInfo.setTiresAndWheels(tiresAndWheels);
        mockCarExtraInfo.setSteering(steering);
        mockCarExtraInfo.setSeats(seats);
        mockCarExtraInfo.setInteriorFeatures(interiorFeatures);
        mockCarExtraInfo.setSportFeatures(sportFeatures);
        mockCarExtraInfo.setComfortFeatures(comfortFeatures);
        mockCarExtraInfo.setAudioVideoCommunication(audioVideoCommunication);
        mockCarExtraInfo.setAdditional(additional);
    }

    @Test
    void createAndSaveCarExtraInfo_ValidDTO_CreatesAndSavesCarExtraInfo() {
        // Act
        carExtraInfoService.createAndSaveCarExtraInfo(carId, mockCarExtraInfoDTO);

        // Assert
        verify(carExtraInfoRepository, times(1)).save(any(CarExtraInfo.class));
    }

    @Test
    void getCarExtraInfoByCarId_CarExists_ReturnsCarExtraInfo() {
        // Arrange
        when(carExtraInfoRepository.findByCarId(carId)).thenReturn(Optional.of(mockCarExtraInfo));
        when(carExtraInfoDTOMapper.apply(mockCarExtraInfo)).thenReturn(mockCarExtraInfoDTO);

        // Act
        Optional<CarExtraInfoDTO> result = carExtraInfoService.getCarExtraInfoByCarId(carId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(mockCarExtraInfoDTO, result.get());
    }

    @Test
    void getCarExtraInfoByCarId_CarNotFound_ReturnsEmpty() {
        // Arrange
        when(carExtraInfoRepository.findByCarId(carId)).thenReturn(Optional.empty());

        // Act
        Optional<CarExtraInfoDTO> result = carExtraInfoService.getCarExtraInfoByCarId(carId);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void deleteCarExtraInfoByCarId_CarExists_DeletesCarExtraInfo() {
        // Arrange
        when(carExtraInfoRepository.findByCarId(carId)).thenReturn(Optional.of(mockCarExtraInfo));

        // Act
        carExtraInfoService.deleteCarExtraInfoByCarId(carId);

        // Assert
        verify(carExtraInfoRepository, times(1)).delete(mockCarExtraInfo);
    }

    @Test
    void deleteCarExtraInfoByCarId_CarNotFound_DoesNothing() {
        // Arrange
        when(carExtraInfoRepository.findByCarId(carId)).thenReturn(Optional.empty());

        // Act
        carExtraInfoService.deleteCarExtraInfoByCarId(carId);

        // Assert
        verify(carExtraInfoRepository, never()).delete(any(CarExtraInfo.class));
    }

    @Test
    void updateCarExtraInfo_CarExists_UpdatesCarExtraInfo() {
        // Arrange
        CarExtraInfoDTO updatedCarExtraInfoDTO = new CarExtraInfoDTO(
                new SafetyAndSecurity(),
                new Lights(),
                new TiresAndWheels(),
                new Steering(),
                new Seats(),
                new InteriorFeatures(),
                new SportFeatures(),
                new Comfort(),
                new AudioVideoCommunication(),
                new Additional()
        );

        when(carExtraInfoRepository.findByCarId(carId)).thenReturn(Optional.of(mockCarExtraInfo));

        // Act
        carExtraInfoService.updateCarExtraInfo(carId, updatedCarExtraInfoDTO);

        // Assert
        verify(carExtraInfoRepository, times(1)).save(mockCarExtraInfo);
        verify(carExtraInfoMapper, times(1)).updateCarExtraInfoFromDto(updatedCarExtraInfoDTO, mockCarExtraInfo);
    }
    @Test
    void updateCarExtraInfo_CarNotFound_ThrowsException() {
        // Arrange
        CarExtraInfoDTO updatedCarExtraInfoDTO = new CarExtraInfoDTO(
                new SafetyAndSecurity(),
                new Lights(),
                new TiresAndWheels(),
                new Steering(),
                new Seats(),
                new InteriorFeatures(),
                new SportFeatures(),
                new Comfort(),
                new AudioVideoCommunication(),
                new Additional()
        );

        when(carExtraInfoRepository.findByCarId(carId)).thenReturn(Optional.empty());

        // Act & Assert
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            carExtraInfoService.updateCarExtraInfo(carId, updatedCarExtraInfoDTO);
        });

        // Assert the status code
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatusCode());

        // Assert the reason string
        assertEquals("Car extra info not found", exception.getReason());
    }

}
