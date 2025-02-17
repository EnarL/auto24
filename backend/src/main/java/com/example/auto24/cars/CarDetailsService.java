package com.example.auto24.cars;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CarDetailsService {

    private final CarDetailsRepository carDetailsRepository;
    private final CarDetailsDTOMapper carDetailsDTOMapper;
    private final CarRepository carRepository;
    private final MongoTemplate mongoTemplate;

    public CarDetailsService(CarDetailsRepository carDetailsRepository, CarDetailsDTOMapper carDetailsDTOMapper, CarRepository carRepository, MongoTemplate mongoTemplate) {
        this.carDetailsRepository = carDetailsRepository;
        this.carDetailsDTOMapper = carDetailsDTOMapper;
        this.carRepository = carRepository;
        this.mongoTemplate = mongoTemplate;
    }


    public List<CarPreviewDTO> searchCars(Map<String, String> searchParams) {
        Query query = CarDetailsSpecification.buildQuery(searchParams);

        List<CarDetails> carDetailsList = mongoTemplate.find(query, CarDetails.class);

        return carDetailsList.stream()
                .map(this::createCarPreviewDTOFromDetails)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private CarPreviewDTO createCarPreviewDTOFromDetails(CarDetails carDetails) {
        Optional<Car> carOptional = carRepository.findById(carDetails.getCarId());
        if (carOptional.isEmpty()) {
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
                .map(this::createCarPreviewDTO)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private CarPreviewDTO createCarPreviewDTO(Car car) {

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
    private CarDTO createCarDTO(Car car) {
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

    private String createCarTitle(CarDetailsDTO carDetailsDTO) {
        String modelTrim = carDetailsDTO.modelTrim() != null ? " " + carDetailsDTO.modelTrim() : "";
        return carDetailsDTO.make() + " " + carDetailsDTO.model() + modelTrim;
    }

    private String extractYearFromFirstRegistrationDate(CarDetailsDTO carDetailsDTO) {
        return carDetailsDTO.firstRegistrationDate() != null
                ? carDetailsDTO.firstRegistrationDate().substring(0, 4)
                : "";
    }

    public List<CarPreviewDTO> getCarPreviewsForUser(String ownerId) {
        List<Car> cars = carRepository.findByOwnerId(ownerId);

        return cars.stream()
                .map(this::createCarPreviewDTO)
                .collect(Collectors.toList());
    }


    public List<CarDTO> getCarDetailsForUser(String ownerId) {
        List<Car> cars = carRepository.findByOwnerId(ownerId);
        return cars.stream().
                map(this::createCarDTO).
                collect(Collectors.toList());

    }
}