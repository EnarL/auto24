package com.example.auto24.cars;

import com.amazonaws.services.kms.model.NotFoundException;
import com.example.auto24.cars.extra_info.CarExtraInfoDTO;
import com.example.auto24.cars.extra_info.CarExtraInfoService;
import com.example.auto24.users.SecurityUtils;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarService {


    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final CarDetailsService carDetailsService;
    private final CarExtraInfoService carExtraInfoService;

    public CarService(UserRepository userRepository, CarRepository carRepository, CarDetailsService carDetailsService, CarExtraInfoService carExtraInfoService) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.carDetailsService = carDetailsService;
        this.carExtraInfoService = carExtraInfoService;
    }


    public void deleteCarsByUserId(String userId) {
        List<Car> cars = carRepository.findByOwnerId(userId);
        for (Car car : cars) {
            carRepository.deleteById(car.getId());
        }
    }
    @Transactional
    public void deleteCarListing(String carId) {
        String userId = SecurityUtils.getAuthenticatedUserId();
        carRepository.findByOwnerId(userId)
                .stream()
                .filter(c -> c.getId().equals(carId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found or you are not authorized to delete this car listing"));

        carDetailsService.deleteCarDetailsByCarId(carId);
        carExtraInfoService.deleteCarExtraInfoByCarId(carId);
        carRepository.deleteById(carId);

        userRepository.findById(userId).ifPresent(owner -> {
            owner.getCarIds().remove(carId);
            userRepository.save(owner);
        });
    }
    @Transactional
    public String createCarListing(CarListingRequest carListingRequest) {
        String userId = SecurityUtils.getAuthenticatedUserId();
        Car savedCar = createAndSaveCar(userId);
        carDetailsService.createAndSaveCarDetails(savedCar.getId(), carListingRequest.carDetailsDTO());
        carExtraInfoService.createAndSaveCarExtraInfo(savedCar.getId(), carListingRequest.carExtraInfoDTO());
        updateUserCarIds(userId, savedCar.getId());

        return savedCar.getId();
    }



    public void updateUserCarIds(String userId, String carId) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.getCarIds().add(carId);
        userRepository.save(user);
    }

    public Car createAndSaveCar(String userId) {
        Car car = Car.builder()
                .ownerId(userId)
                .imageKeys(List.of())
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


    public Optional<CarListingResponse> getCarListingById(String id) {
        Optional<CarDetailsDTO> carDetailsOpt = carDetailsService.getCarDetailsById(id);
        Optional<CarExtraInfoDTO> carExtraInfoOpt = carExtraInfoService.getCarExtraInfoByCarId(id);

        if (carDetailsOpt.isEmpty() || carExtraInfoOpt.isEmpty()) {
            return Optional.empty();
        }

        CarDetailsDTO carDetailsDTO = carDetailsOpt.get();
        CarExtraInfoDTO carExtraInfoDTO = carExtraInfoOpt.get();
        return Optional.of(new CarListingResponse(carDetailsDTO, carExtraInfoDTO));
    }

    @Transactional
    public void updateCarListing(String carId, CarListingRequest carListingRequest) {
        carRepository.findById(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

        carDetailsService.updateCarDetails(carId, carListingRequest.carDetailsDTO());
        carExtraInfoService.updateCarExtraInfo(carId, carListingRequest.carExtraInfoDTO());
    }

    public Long countCars() {
        return carRepository.countByIsActiveTrue();
    }


    public boolean toggleCarListingStatus(String carId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

        car.setActive(!car.isActive());
        carRepository.save(car);

        return car.isActive();
    }


    public List<CarPreviewDTO> getOwnerOtherSales(String carId) {
        String ownerId = findUserIdFromCarId(carId);
        List<Car> ownerCars = carRepository.findByOwnerId(ownerId);
        return ownerCars.stream()
                    .filter(Car::isActive)
                    .filter(c -> !c.getId().equals(carId))
                    .map(carDetailsService::createCarPreviewDTO)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
    }

    public String findUserIdFromCarId(String carId) {
        return carRepository.findById(carId)
                .map(Car::getOwnerId)
                .orElseThrow(() -> new NotFoundException("Car not found with ID: " + carId));
    }

}