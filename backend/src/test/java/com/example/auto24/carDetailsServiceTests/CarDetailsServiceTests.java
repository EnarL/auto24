package com.example.auto24.carDetailsServiceTests;

import com.example.auto24.cars.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CarDetailsServiceTests {

    @Mock
    private CarDetailsRepository carDetailsRepository;

    @Mock
    private CarDetailsDTOMapper carDetailsDTOMapper;

    @InjectMocks
    private CarDetailsService carDetailsService;

    private Car mockCar;
    private CarDetails mockCarDetails;
    private CarDetailsDTO mockCarDetailsDTO;

    @BeforeEach
    void setUp() {
        // Create mock car
        mockCar = new Car();
        mockCar.setId("car123");
        mockCar.setOwnerId("user123");
        mockCar.setActive(true);
        mockCar.setCreatedAt(LocalDateTime.now());
        mockCar.setImageKeys(Arrays.asList("image1", "image2"));

        // Create comprehensive mock car details
        mockCarDetails = new CarDetails();
        mockCarDetails.setCarId("car123");
        mockCarDetails.setMake("Toyota");
        mockCarDetails.setModel("Corolla");
        mockCarDetails.setModelTrim("XLE");
        mockCarDetails.setPrice(25000.0);
        mockCarDetails.setFirstRegistrationDate("2020-01-15");


        mockCarDetailsDTO = new CarDetailsDTO(
                "car123",  // carId
                "Sedan",   // vehicleType
                "Compact", // bodyType
                "4-door",  // bodyTypeDetail
                "Corolla", // model
                "Toyota",  // make
                "11th",    // modelGeneration
                "XLE",     // modelTrim
                "2020-01-15", // firstRegistrationDate
                25000.0,   // price
                false,     // includesRegistrationFee
                50000,     // odometerReading
                true,      // hasServiceBook
                "VIN123456", // vinCode
                "REG789",  // registrationNumber
                "Automatic", // transmission
                "FWD",     // driveType
                2.0,       // engineCapacityLiters
                2000,      // engineCapacityCubicCentimeters
                "Inline",  // engineConfiguration
                "2.0L 4-cylinder", // engineDetails
                110,       // enginePowerKW
                148,       // enginePowerHP
                "Petrol",  // fuelType
                50.0,      // fuelTankCapacity
                6.5,       // fuelConsumptionHighway
                8.5,       // fuelConsumptionCity
                7.5,       // fuelConsumptionCombined
                "EU6",     // fuelConsumptionStandard
                150,       // co2Emissions
                5,         // seatingCapacity
                4,         // numberOfDoors
                true,      // hasWarranty
                false,     // accidentDamaged
                "Blue",    // color
                true,      // metallicColor
                "Metallic Blue", // colorDetail
                1400,      // curbWeight
                1800,      // grossWeight
                500,       // payloadCapacity
                1500,      // brakedTrailerWeight
                750,       // unbrakedTrailerWeight
                2700,      // wheelbase
                4700,      // length
                1800,      // width
                1400,      // height
                2,         // numberOfAxles
                9.5,       // acceleration0To100
                200.0,     // topSpeed
                "Germany", // locationCountry
                "Bavaria", // locationCounty
                "USA",     // importedFromCountry
                true,      // registeredInCountry
                "2024-12-31", // inspectionValidUntil
                false,     // reserved
                null,      // reservationUntilDate
                false,     // exchangePossible
                null,      // exchangeDetails
                "Well-maintained family car" // description
        );
    }

    @Test
    void createCarTitle_FullDetails_ReturnsCorrectTitle() {
        // Act
        String title = carDetailsService.createCarTitle(mockCarDetailsDTO);

        // Assert
        assertEquals("Toyota XLE", title);
    }

    @Test
    void createCarTitle_MissingMake_ReturnsModelWithTrim() {
        // Arrange
        CarDetailsDTO incompleteDTO = new CarDetailsDTO(
                "car123",  // carId
                "Sedan",   // vehicleType
                "Compact", // bodyType
                "4-door",  // bodyTypeDetail
                "Civic",   // model
                null,      // make (null to simulate missing make)
                "11th",    // modelGeneration
                "EX",      // modelTrim
                "2020-01-15", // firstRegistrationDate
                25000.0,   // price
                false,     // includesRegistrationFee
                50000,     // odometerReading
                true,      // hasServiceBook
                "VIN123456", // vinCode
                "REG789",  // registrationNumber
                "Automatic", // transmission
                "FWD",     // driveType
                2.0,       // engineCapacityLiters
                2000,      // engineCapacityCubicCentimeters
                "Inline",  // engineConfiguration
                "2.0L 4-cylinder", // engineDetails
                110,       // enginePowerKW
                148,       // enginePowerHP
                "Petrol",  // fuelType
                50.0,      // fuelTankCapacity
                6.5,       // fuelConsumptionHighway
                8.5,       // fuelConsumptionCity
                7.5,       // fuelConsumptionCombined
                "EU6",     // fuelConsumptionStandard
                150,       // co2Emissions
                5,         // seatingCapacity
                4,         // numberOfDoors
                true,      // hasWarranty
                false,     // accidentDamaged
                "Blue",    // color
                true,      // metallicColor
                "Metallic Blue", // colorDetail
                1400,      // curbWeight
                1800,      // grossWeight
                500,       // payloadCapacity
                1500,      // brakedTrailerWeight
                750,       // unbrakedTrailerWeight
                2700,      // wheelbase
                4700,      // length
                1800,      // width
                1400,      // height
                2,         // numberOfAxles
                9.5,       // acceleration0To100
                200.0,     // topSpeed
                "Germany", // locationCountry
                "Bavaria", // locationCounty
                "USA",     // importedFromCountry
                true,      // registeredInCountry
                "2024-12-31", // inspectionValidUntil
                false,     // reserved
                null,      // reservationUntilDate
                false,     // exchangePossible
                null,      // exchangeDetails
                "Well-maintained family car" // description
        );

        // Act
        String title = carDetailsService.createCarTitle(incompleteDTO);

        // Assert
        assertEquals("Civic EX", title);
    }

    @Test
    void extractYearFromFirstRegistrationDate_ValidDate_ReturnsYear() {
        // Act
        String year = carDetailsService.extractYearFromFirstRegistrationDate(mockCarDetailsDTO);

        // Assert
        assertEquals("2020", year);
    }

    @Test
    void extractYearFromFirstRegistrationDate_InvalidDate_ReturnsEmptyString() {
        // Arrange
        CarDetailsDTO invalidDateDTO = new CarDetailsDTO(
                "car123",  // carId
                "Sedan",   // vehicleType
                "Compact", // bodyType
                "4-door",  // bodyTypeDetail
                "Corolla", // model
                "Toyota",  // make
                "11th",    // modelGeneration
                "XLE",     // modelTrim
                "InvalidDate", // Invalid firstRegistrationDate
                25000.0,   // price
                false,     // includesRegistrationFee
                50000,     // odometerReading
                true,      // hasServiceBook
                "VIN123456", // vinCode
                "REG789",  // registrationNumber
                "Automatic", // transmission
                "FWD",     // driveType
                2.0,       // engineCapacityLiters
                2000,      // engineCapacityCubicCentimeters
                "Inline",  // engineConfiguration
                "2.0L 4-cylinder", // engineDetails
                110,       // enginePowerKW
                148,       // enginePowerHP
                "Petrol",  // fuelType
                50.0,      // fuelTankCapacity
                6.5,       // fuelConsumptionHighway
                8.5,       // fuelConsumptionCity
                7.5,       // fuelConsumptionCombined
                "EU6",     // fuelConsumptionStandard
                150,       // co2Emissions
                5,         // seatingCapacity
                4,         // numberOfDoors
                true,      // hasWarranty
                false,     // accidentDamaged
                "Blue",    // color
                true,      // metallicColor
                "Metallic Blue", // colorDetail
                1400,      // curbWeight
                1800,      // grossWeight
                500,       // payloadCapacity
                1500,      // brakedTrailerWeight
                750,       // unbrakedTrailerWeight
                2700,      // wheelbase
                4700,      // length
                1800,      // width
                1400,      // height
                2,         // numberOfAxles
                9.5,       // acceleration0To100
                200.0,     // topSpeed
                "Germany", // locationCountry
                "Bavaria", // locationCounty
                "USA",     // importedFromCountry
                true,      // registeredInCountry
                "2024-12-31", // inspectionValidUntil
                false,     // reserved
                null,      // reservationUntilDate
                false,     // exchangePossible
                null,      // exchangeDetails
                "Well-maintained family car" // description
        );

        // Act
        String year = carDetailsService.extractYearFromFirstRegistrationDate(invalidDateDTO);

        // Assert
        assertEquals("", year);
    }

    @Test
    void createCarPreviewDTO_ActiveCarWithDetails_ReturnsPreview() {
        // Arrange
        when(carDetailsRepository.findByCarId(mockCar.getId())).thenReturn(Optional.of(mockCarDetails));
        when(carDetailsDTOMapper.apply(mockCarDetails)).thenReturn(mockCarDetailsDTO);

        // Act
        CarPreviewDTO preview = carDetailsService.createCarPreviewDTO(mockCar);

        // Assert
        assertNotNull(preview);
        assertEquals(mockCar.getId(), preview.id());
        assertEquals("Toyota XLE", preview.title());
        assertEquals(25000.0, preview.price());
        assertEquals("2020", preview.firstRegistrationDate());
        assertEquals(mockCar.getImageKeys(), preview.imageKeys());
    }

    @Test
    void createCarPreviewDTO_InactiveCar_ReturnsNull() {
        // Arrange
        Car inactiveCar = new Car();
        inactiveCar.setActive(false);

        // Act
        CarPreviewDTO preview = carDetailsService.createCarPreviewDTO(inactiveCar);

        // Assert
        assertNull(preview);
    }
}
