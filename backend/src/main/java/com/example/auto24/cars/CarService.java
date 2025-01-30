package com.example.auto24.cars;

import com.example.auto24.jwt.JWTUtil;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {


    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final JWTUtil jwtUtil;
    private final CarDTOMapper carDTOMapper;
    private final CarDetailsRepository carDetailsRepository;
    public CarService(UserRepository userRepository, CarRepository carRepository, JWTUtil jwtUtil, CarDTOMapper carDTOMapper, CarDetailsRepository carDetailsRepository) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.jwtUtil = jwtUtil;
        this.carDTOMapper = carDTOMapper;
        this.carDetailsRepository = carDetailsRepository;
    }

    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(carDTOMapper).collect(Collectors.toList());
    }

    public CarDTO getCarById(String id) {
        return carRepository.findById(id).
                map(carDTOMapper).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
    }
    public void saveCar(HttpServletRequest jwt) {
        String authorizationHeader = jwt.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authorization header is missing or invalid");
        }

        String token = authorizationHeader.substring(7);
        String userId = jwtUtil.extractUserId(token);

        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token: userId is null");
        }


        Users owner = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        LocalDateTime expirationDate = LocalDateTime.now().plusMonths(1);

        Car car = Car.builder()

                .ownerId(userId)
                .expirationDate(expirationDate)
                .build();

        Car savedCar = carRepository.save(car);
        owner.getCarIds().add(savedCar.getId());
        userRepository.save(owner);
    }

    public void deleteCar(String id) {
        Car car = carRepository.findById(id).orElse(null);
        if (car != null) {
            Users owner = userRepository.findById(car.getOwnerId()).orElse(null);
            if (owner != null) {
                owner.getCarIds().remove(car.getId());
                userRepository.save(owner);
            }
            carRepository.deleteById(id);
        }
    }

    public void deleteCarsByUserId(String userId) {
        List<Car> cars = carRepository.findByOwnerId(userId);
        for (Car car : cars) {
            carRepository.deleteById(car.getId());
        }
    }
    // Method to extract userId from the JWT token
    public String extractUserIdFromToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authorization header is missing or invalid");
        }

        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
        return jwtUtil.extractUserId(token); // This is where you extract the userId from the token
    }

    public void createCarListing(CarDetailsDTO carDetailsDTO, String userId) {
        // Step 1: Create the Car entity
        Car car = Car.builder()
                .ownerId(userId) // Set the user ID automatically from token
                .createdAt(LocalDateTime.now())
                .expirationDate(LocalDateTime.now().plusMonths(1))  // Set expiration date to 1 month from now
                .build();

        // Save the car to the database
        Car savedCar = carRepository.save(car);

        // Step 2: Create the CarDetails entity using the carId
        CarDetails carDetails = new CarDetails();
        carDetails.setCarId(savedCar.getId());
        carDetails.setVehicleType(carDetailsDTO.vehicleType());
        carDetails.setBodyType(carDetailsDTO.bodyType());
        carDetails.setBodyTypeDetail(carDetailsDTO.bodyTypeDetail());
        carDetails.setModel(carDetailsDTO.model());
        carDetails.setModelName(carDetailsDTO.modelName());
        carDetails.setModelGeneration(carDetailsDTO.modelGeneration());
        carDetails.setModelTrim(carDetailsDTO.modelTrim());
        carDetails.setFirstRegistrationDate(carDetailsDTO.firstRegistrationDate());
        carDetails.setPrice(carDetailsDTO.price());
        carDetails.setIncludesRegistrationFee(carDetailsDTO.includesRegistrationFee());
        carDetails.setDiscountPrice(carDetailsDTO.discountPrice());
        carDetails.setExportPrice(carDetailsDTO.exportPrice());
        carDetails.setOdometerReading(carDetailsDTO.odometerReading());
        carDetails.setHasServiceBook(carDetailsDTO.hasServiceBook());
        carDetails.setVinCode(carDetailsDTO.vinCode());
        carDetails.setRegistrationNumber(carDetailsDTO.registrationNumber());
        carDetails.setTransmission(carDetailsDTO.transmission());
        carDetails.setDriveType(carDetailsDTO.driveType());
        carDetails.setEngineCapacityLiters(carDetailsDTO.engineCapacityLiters());
        carDetails.setEngineCapacityCubicCentimeters(carDetailsDTO.engineCapacityCubicCentimeters());
        carDetails.setEngineConfiguration(carDetailsDTO.engineConfiguration());
        carDetails.setEngineDetails(carDetailsDTO.engineDetails());
        carDetails.setEnginePowerKW(carDetailsDTO.enginePowerKW());
        carDetails.setEnginePowerHP(carDetailsDTO.enginePowerHP());
        carDetails.setFuelType(carDetailsDTO.fuelType());
        carDetails.setFuelTankCapacity(carDetailsDTO.fuelTankCapacity());
        carDetails.setFuelConsumptionHighway(carDetailsDTO.fuelConsumptionHighway());
        carDetails.setFuelConsumptionCity(carDetailsDTO.fuelConsumptionCity());
        carDetails.setFuelConsumptionCombined(carDetailsDTO.fuelConsumptionCombined());
        carDetails.setFuelConsumptionStandard(carDetailsDTO.fuelConsumptionStandard());
        carDetails.setCo2Emissions(carDetailsDTO.co2Emissions());
        carDetails.setSeatingCapacity(carDetailsDTO.seatingCapacity());
        carDetails.setNumberOfDoors(carDetailsDTO.numberOfDoors());
        carDetails.setHasWarranty(carDetailsDTO.hasWarranty());
        carDetails.setAccidentDamaged(carDetailsDTO.accidentDamaged());
        carDetails.setColor(carDetailsDTO.color());
        carDetails.setMetallicColor(carDetailsDTO.metallicColor());
        carDetails.setColorDetail(carDetailsDTO.colorDetail());
        carDetails.setCurbWeight(carDetailsDTO.curbWeight());
        carDetails.setGrossWeight(carDetailsDTO.grossWeight());
        carDetails.setPayloadCapacity(carDetailsDTO.payloadCapacity());
        carDetails.setBrakedTrailerWeight(carDetailsDTO.brakedTrailerWeight());
        carDetails.setUnbrakedTrailerWeight(carDetailsDTO.unbrakedTrailerWeight());
        carDetails.setWheelbase(carDetailsDTO.wheelbase());
        carDetails.setLength(carDetailsDTO.length());
        carDetails.setWidth(carDetailsDTO.width());
        carDetails.setHeight(carDetailsDTO.height());
        carDetails.setAcceleration0To100(carDetailsDTO.acceleration0To100());
        carDetails.setTopSpeed(carDetailsDTO.topSpeed());
        carDetails.setLocationCountry(carDetailsDTO.locationCountry());
        carDetails.setLocationCounty(carDetailsDTO.locationCounty());
        carDetails.setImportedFromCountry(carDetailsDTO.importedFromCountry());
        carDetails.setRegisteredInCountry(carDetailsDTO.registeredInCountry());
        carDetails.setInspectionValidUntil(carDetailsDTO.inspectionValidUntil());
        carDetails.setReserved(carDetailsDTO.reserved());
        carDetails.setReservationUntilDate(carDetailsDTO.reservationUntilDate());
        carDetails.setExchangePossible(carDetailsDTO.exchangePossible());
        carDetails.setExchangeDetails(carDetailsDTO.exchangeDetails());
        carDetails.setDescription(carDetailsDTO.description());

        carDetailsRepository.save(carDetails);
    }


}