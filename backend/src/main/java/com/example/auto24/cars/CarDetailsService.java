package com.example.auto24.cars;

import com.example.auto24.aws.ImageService;
import com.example.auto24.users.SecurityUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CarDetailsService {

    private final CarDetailsRepository carDetailsRepository;
    private final CarDetailsDTOMapper carDetailsDTOMapper;
    private final CarRepository carRepository;
    private final MongoTemplate mongoTemplate;
    private final CarDetailsUpdateMapper carDetailsUpdateMapper;
    private final ImageService imageService;

    public CarDetailsService(CarDetailsRepository carDetailsRepository, CarDetailsDTOMapper carDetailsDTOMapper, CarRepository carRepository, MongoTemplate mongoTemplate, CarDetailsUpdateMapper carDetailsUpdateMapper, ImageService imageService) {
        this.carDetailsRepository = carDetailsRepository;
        this.carDetailsDTOMapper = carDetailsDTOMapper;
        this.carRepository = carRepository;
        this.mongoTemplate = mongoTemplate;
        this.carDetailsUpdateMapper = carDetailsUpdateMapper;
        this.imageService = imageService;
    }

    public List<CarPreviewDTO> searchCars(Map<String, String> searchParams) {
        if (searchParams == null || searchParams.isEmpty()) {
            return getAllCarsPreview();
        }

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
                .filter(Car::isActive)
                .map(this::createCarPreviewDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }


    public void createAndSaveCarDetails(String carId, CarDetailsDTO carDetailsDTO) {
        CarDetails carDetails = carDetailsDTOMapper.toEntity(carDetailsDTO, carId);
        carDetailsRepository.save(carDetails);
    }

    public Optional<CarDetailsDTO> getCarDetailsById(String id) {
        return carDetailsRepository.findByCarId(id)
                .map(carDetailsDTOMapper);
    }

    public List<CarPreviewDTO> getAllCarsPreview() {
        return carRepository.findAll().stream()
                .filter(Car::isActive)
                .map(this::createCarPreviewDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    // Replace these methods in CarDetailsService.java

    public CarPreviewDTO createCarPreviewDTOFromDetails(CarDetails carDetails) {
        Optional<Car> carOptional = carRepository.findById(carDetails.getCarId());
        if (carOptional.isEmpty() || !carOptional.get().isActive()) {
            return null;
        }
        Car car = carOptional.get();
        CarDetailsDTO carDetailsDTO = carDetailsDTOMapper.apply(carDetails);

        // Convert image keys to public URLs
        List<String> imageUrls = car.getImageKeys() != null
                ? car.getImageKeys().stream()
                .map(imageService::getPublicUrl)
                .collect(Collectors.toList())
                : new ArrayList<>();

        return new CarPreviewDTO(
                car.getId(),
                createCarTitle(carDetailsDTO),
                carDetailsDTO.price(),
                extractYearFromFirstRegistrationDate(carDetailsDTO),
                imageUrls // Now passing URLs instead of keys
        );
    }

    public CarPreviewDTO createCarPreviewDTO(Car car) {
        Optional<CarDetails> carDetailsOptional = carDetailsRepository.findByCarId(car.getId());
        if (carDetailsOptional.isEmpty()) {
            return null;
        }
        CarDetails carDetails = carDetailsOptional.get();
        CarDetailsDTO carDetailsDTO = carDetailsDTOMapper.apply(carDetails);

        // Convert image keys to public URLs
        List<String> imageUrls = car.getImageKeys() != null
                ? car.getImageKeys().stream()
                .map(imageService::getPublicUrl)
                .collect(Collectors.toList())
                : new ArrayList<>();

        return new CarPreviewDTO(
                car.getId(),
                createCarTitle(carDetailsDTO),
                carDetailsDTO.price(),
                extractYearFromFirstRegistrationDate(carDetailsDTO),
                imageUrls // Now passing URLs instead of keys
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
        if (!make.isEmpty()) {
            return make + modelTrim;
        } else if (!model.isEmpty()) {
            return model + modelTrim;
        } else if (!modelTrim.isEmpty()) {
            return modelTrim.trim();
        } else {
            return "";
        }
    }

    public String extractYearFromFirstRegistrationDate(CarDetailsDTO carDetailsDTO) {
        if (carDetailsDTO.firstRegistrationDate() != null) {
            try {
                DateTimeFormatter fullFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate fullDate = LocalDate.parse(carDetailsDTO.firstRegistrationDate(), fullFormatter);
                return String.valueOf(fullDate.getYear());
            } catch (DateTimeException e) {
                try {
                    DateTimeFormatter partialFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
                    LocalDate partialDate = LocalDate.parse(carDetailsDTO.firstRegistrationDate() + "-01", partialFormatter);
                    return String.valueOf(partialDate.getYear());
                } catch (DateTimeException ignored) {

                    return "";
                }
            }
        }
        return "";
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

    public List<CarPreviewDTO> getAllCarsPreviewWithImages() {
        List<Car> cars = carRepository.findAll().stream()
                .filter(Car::isActive)
                .limit(30)
                .toList();

        return cars.stream()
                .map(car -> {
                    Optional<CarDetails> carDetailsOptional = carDetailsRepository.findByCarId(car.getId());
                    if (carDetailsOptional.isEmpty()) {
                        return null;
                    }
                    CarDetails carDetails = carDetailsOptional.get();
                    String title = createCarTitle(carDetailsDTOMapper.apply(carDetails));
                    double price = carDetails.getPrice();
                    String firstRegistrationDate = carDetails.getFirstRegistrationDate();
                    List<String> imageUrls = car.getImageKeys().stream()
                            .map(imageService::getPublicUrl)
                            .collect(Collectors.toList());
                    return new CarPreviewDTO(
                            car.getId(),
                            title,
                            price,
                            firstRegistrationDate,
                            imageUrls
                    );
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }


}