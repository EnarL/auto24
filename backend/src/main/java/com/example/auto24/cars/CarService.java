package com.example.auto24.cars;

import com.example.auto24.auth.JWTUtil;
import com.example.auto24.cars.extra_info.CarExtraInfoService;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
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
    private final CarDetailsService carDetailsService;
    private final CarExtraInfoService carExtraInfoService;

    public CarService(UserRepository userRepository, CarRepository carRepository, JWTUtil jwtUtil, CarDTOMapper carDTOMapper, CarDetailsService carDetailsService, CarExtraInfoService carExtraInfoService) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.jwtUtil = jwtUtil;
        this.carDTOMapper = carDTOMapper;
        this.carDetailsService = carDetailsService;
        this.carExtraInfoService = carExtraInfoService;
    }
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(carDTOMapper).collect(Collectors.toList());
    }

    public CarDTO getCarById(String id) {
        return carRepository.findById(id).
                map(carDTOMapper).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
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
    public String extractUserIdFromToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authorization header is missing or invalid");
        }
        String token = authorizationHeader.substring(7);
        return jwtUtil.extractUserId(token);
    }
    public void createCarListing(String authorizationHeader, CarListingRequest carListingRequest) {
        String userId = extractUserIdFromToken(authorizationHeader);
        Car savedCar = createAndSaveCar(userId);
        carDetailsService.createAndSaveCarDetails(savedCar.getId(), carListingRequest.carDetailsDTO());
        carExtraInfoService.createAndSaveCarExtraInfo(savedCar.getId(), carListingRequest.carExtraInfoDTO());
    }
    public Car createAndSaveCar(String userId) {
        Car car = Car.builder()
                .ownerId(userId)
                .createdAt(LocalDateTime.now())
                .expirationDate(LocalDateTime.now().plusMonths(1))
                .build();
        return carRepository.save(car);
    }
    public void extendCarExpirationDate(String carId, int months) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
        car.setExpirationDate(car.getExpirationDate().plusMonths(months));
        carRepository.save(car);
    }
    public List<CarDTO> getAllCarsByOwnerId(String authorizationHeader) {
        String userId = extractUserIdFromToken(authorizationHeader);
        List<Car> cars = carRepository.findByOwnerId(userId);
        return cars.stream().map(carDTOMapper).collect(Collectors.toList());
    }
}