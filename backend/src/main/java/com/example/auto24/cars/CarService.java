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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {
    private static final Logger logger = LoggerFactory.getLogger(CarService.class);

    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final CarDTOMapper carDTOMapper;
    private final JWTUtil jwtUtil;

    public CarService(UserRepository userRepository, CarRepository carRepository, CarDTOMapper carDTOMapper, JWTUtil jwtUtil) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.carDTOMapper = carDTOMapper;
        this.jwtUtil = jwtUtil;
    }

    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(carDTOMapper).collect(Collectors.toList());
    }

    public CarDTO getCarById(String id) {
        return carRepository.findById(id).
                map(carDTOMapper).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
    }

    public void saveCar(CarRegisterRequest request, HttpServletRequest jwt) {
        String authorizationHeader = jwt.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authorization header is missing or invalid");
        }

        String token = authorizationHeader.substring(7);
        String userId = jwtUtil.extractUserId(token);

        if (userId == null) {
            logger.error("Extracted userId is null");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token: userId is null");
        }

        logger.debug("Extracted userId: {}", userId);

        Users owner = userRepository.findById(userId).orElseThrow(() -> {
            logger.error("User not found for userId: {}", userId);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        });

        Car car = Car.builder()
                .brand(request.brand())
                .model(request.model())
                .price(request.price())
                .year(request.year())
                .mileage(request.mileage())
                .fuelType(request.fuelType())
                .ownerId(userId)
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
}