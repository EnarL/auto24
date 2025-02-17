package com.example.auto24.cars;

import com.example.auto24.cars.extra_info.CarExtraInfoDTO;
import com.example.auto24.cars.extra_info.CarExtraInfoService;
import com.example.auto24.users.UserPrincipal;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public void createCarListing(UserPrincipal userDetails, CarListingRequest carListingRequest) {
        String userId = userDetails.getUserId();
        Car savedCar = createAndSaveCar(userId);

        carDetailsService.createAndSaveCarDetails(savedCar.getId(), carListingRequest.carDetailsDTO());

        carExtraInfoService.createAndSaveCarExtraInfo(savedCar.getId(), carListingRequest.carExtraInfoDTO());
        updateUserCarIds(userId, savedCar.getId());
    }


    private void updateUserCarIds(String userId, String carId) {
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
}