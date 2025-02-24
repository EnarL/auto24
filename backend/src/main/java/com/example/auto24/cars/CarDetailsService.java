package com.example.auto24.cars;

import com.example.auto24.users.SecurityUtils;
import com.example.auto24.users.UserPrincipal;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CarDetailsService {

    private final CarDetailsRepository carDetailsRepository;
    private final CarDetailsDTOMapper carDetailsDTOMapper;
    private final CarRepository carRepository;
    private final MongoTemplate mongoTemplate;
    private final CarDetailsUpdateMapper carDetailsUpdateMapper;
    private final UserRepository userRepository;

    public CarDetailsService(CarDetailsRepository carDetailsRepository, CarDetailsDTOMapper carDetailsDTOMapper, CarRepository carRepository, MongoTemplate mongoTemplate, CarDetailsUpdateMapper carDetailsUpdateMapper, UserRepository userRepository) {
        this.carDetailsRepository = carDetailsRepository;
        this.carDetailsDTOMapper = carDetailsDTOMapper;
        this.carRepository = carRepository;
        this.mongoTemplate = mongoTemplate;
        this.carDetailsUpdateMapper = carDetailsUpdateMapper;
        this.userRepository = userRepository;
    }


    public List<CarPreviewDTO> searchCars(Map<String, String> searchParams) {
        Query query = CarDetailsSpecification.buildQuery(searchParams);

        List<CarDetails> carDetailsList = mongoTemplate.find(query, CarDetails.class);

        return carDetailsList.stream()
                .map(this::createCarPreviewDTOFromDetails)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
    public List<CarPreviewDTO> getCarPreviewsForUser() {
        String userId = SecurityUtils.getAuthenticatedUserId();
        List<Car> cars = carRepository.findByOwnerId(userId);
        return cars.stream()
                .map(this::createCarPreviewDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public CarPreviewDTO createCarPreviewDTOFromDetails(CarDetails carDetails) {
        Optional<Car> carOptional = carRepository.findById(carDetails.getCarId());
        if (carOptional.isEmpty() || !carOptional.get().isActive()) {
            return null;
        }
        Car car = carOptional.get();
        CarDetailsDTO carDetailsDTO = carDetailsDTOMapper.apply(carDetails);

        List<String> imageKeys = car.getImageKeys() != null ? car.getImageKeys() : new ArrayList<>();
        return new CarPreviewDTO(
                car.getId(),
                createCarTitle(carDetailsDTO),
                carDetailsDTO.price(),
                extractYearFromFirstRegistrationDate(carDetailsDTO),
                imageKeys
        );
    }

    public void createAndSaveCarDetails(String carId, CarDetailsDTO carDetailsDTO) {
        CarDetails carDetails = carDetailsDTOMapper.toEntity(carDetailsDTO, carId);
        carDetailsRepository.save(carDetails);
    }

    public Optional<CarDetailsDTO> getCarDetailsById(String id) {
        return carDetailsRepository.findByCarId(id)
                .map(carDetailsDTOMapper::apply);
    }

    public List<CarPreviewDTO> getAllCarsPreview() {
        return carRepository.findAll().stream()
                .filter(Car::isActive)
                .map(this::createCarPreviewDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public CarPreviewDTO createCarPreviewDTO(Car car) {
        Optional<CarDetails> carDetailsOptional = carDetailsRepository.findByCarId(car.getId());
        if (carDetailsOptional.isEmpty()) {
            return null;
        }
        CarDetails carDetails = carDetailsOptional.get();
        CarDetailsDTO carDetailsDTO = carDetailsDTOMapper.apply(carDetails);
        List<String> imageKeys = car.getImageKeys() != null ? car.getImageKeys() : new ArrayList<>();

        return new CarPreviewDTO(
                car.getId(),
                createCarTitle(carDetailsDTO),
                carDetailsDTO.price(),
                extractYearFromFirstRegistrationDate(carDetailsDTO),
                imageKeys
        );
    }
    public CarDTO createCarDTO(Car car) {
        Optional<CarDetails> carDetailsOptional = carDetailsRepository.findByCarId(car.getId());
        if (carDetailsOptional.isEmpty()) {
            return null;
        }
        CarDetails carDetails = carDetailsOptional.get();
        CarDetailsDTO carDetailsDTO = carDetailsDTOMapper.apply(carDetails);
        return new CarDTO(
                car.getId(),
                car.getOwnerId(),
                createCarTitle(carDetailsDTO),
                car.getCreatedAt(),
                car.getExpirationDate(),
                car.isActive()
        );
    }

    public String createCarTitle(CarDetailsDTO carDetailsDTO) {
        String make = Optional.ofNullable(carDetailsDTO.make()).orElse("");
        String model = Optional.ofNullable(carDetailsDTO.model()).orElse("");
        String modelTrim = Optional.ofNullable(carDetailsDTO.modelTrim()).map(trim -> " " + trim).orElse("");

        return make + " " + model + modelTrim;
    }

    public String extractYearFromFirstRegistrationDate(CarDetailsDTO carDetailsDTO) {
        return carDetailsDTO.firstRegistrationDate() != null
                ? carDetailsDTO.firstRegistrationDate().substring(0, 4)
                : "";
    }


    public List<CarDTO> getCarDetailsForUser() {
        String userId = SecurityUtils.getAuthenticatedUserId();
        List<Car> cars = carRepository.findByOwnerId(userId);
        return cars.stream().
                map(this::createCarDTO).
                collect(Collectors.toList());

    }

    public void deleteCarDetailsByCarId(String carId) {
        carDetailsRepository.findByCarId(carId).ifPresent(carDetailsRepository::delete);
    }

    public void updateCarDetails(String carId, CarDetailsDTO carDetailsDTO) {
        CarDetails carDetails = carDetailsRepository.findByCarId(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car details not found"));
        carDetailsUpdateMapper.updateCarDetailsFromDto(carDetailsDTO, carDetails);
        carDetailsRepository.save(carDetails);
    }
}