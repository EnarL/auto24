package com.example.auto24.cars;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class CarDetailsService {

    private final CarDetailsRepository carDetailsRepository;
    private final CarDetailsDTOMapper carDetailsDTOMapper;
    private final CarRepository carRepository;
    private final CarDetailsUpdateMapper carDetailsUpdateMapper;

    public CarDetailsService(CarDetailsRepository carDetailsRepository, CarDetailsDTOMapper carDetailsDTOMapper, CarRepository carRepository, CarDetailsUpdateMapper carDetailsUpdateMapper) {
        this.carDetailsRepository = carDetailsRepository;
        this.carDetailsDTOMapper = carDetailsDTOMapper;
        this.carRepository = carRepository;
        this.carDetailsUpdateMapper = carDetailsUpdateMapper;
    }

    public List<CarDetailsDTO> searchCars(CarDetailsDTO carDetailsDTO) {
        Predicate<CarDetails> filterPredicate = CarDetailsFilter.buildFilter(carDetailsDTO);

        return carDetailsRepository.findAll().stream()
                .filter(filterPredicate)
                .map(carDetailsDTOMapper)
                .collect(Collectors.toList());
    }

    public void createAndSaveCarDetails(String carId, CarDetailsDTO carDetailsDTO) {
        CarDetails carDetails = carDetailsDTOMapper.toEntity(carDetailsDTO, carId);
        carDetailsRepository.save(carDetails);
    }

    public List<CarDetails> getAllCarDetails() {
        return carDetailsRepository.findAll();
    }

    public Optional<CarDetailsDTO> getCarDetailsById(String id) {
        return carDetailsRepository.findByCarId(id)
                .map(carDetailsDTOMapper::apply);
    }

    public CarDetails createCarDetails(CarDetails carDetails) {
        return carDetailsRepository.save(carDetails);
    }

    public Optional<CarDetails> updateCarDetails(String id, CarDetails carDetailsDetails) {
        return carDetailsRepository.findById(id).map(existingCarDetails -> {
            carDetailsUpdateMapper.updateCarDetailsFromDto(carDetailsDetails, existingCarDetails);
            return carDetailsRepository.save(existingCarDetails);
        });
    }
    public void deleteCarDetails(String id) {
        carDetailsRepository.findById(id).ifPresent(carDetailsRepository::delete);
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
        List<String> imageKeys = car.getImageKeys() != null ? car.getImageKeys() : new ArrayList<>();

        return new CarPreviewDTO(
                car.getId(),
                createCarTitle(carDetails),
                carDetails.getPrice(),
                extractYearFromFirstRegistrationDate(carDetails),
                imageKeys
        );
    }

    private String createCarTitle(CarDetails carDetails) {
        String modelTrim = carDetails.getModelTrim() != null ? " " + carDetails.getModelTrim() : "";
        return carDetails.getMake() + " " + carDetails.getModel() + modelTrim;
    }

    private String extractYearFromFirstRegistrationDate(CarDetails carDetails) {
        return carDetails.getFirstRegistrationDate() != null
                ? carDetails.getFirstRegistrationDate().substring(0, 4)
                : "";
    }
    public List<CarPreviewDTO> getCarPreviewsForUser(String ownerId) {
        List<Car> cars = carRepository.findByOwnerId(ownerId);

        return cars.stream()
                .map(this::createCarPreviewDTO)
                .collect(Collectors.toList());
    }

}