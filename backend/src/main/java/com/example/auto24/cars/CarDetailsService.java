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
        // Fetch CarDetails from the repository using car ID
        Optional<CarDetails> carDetailsOptional = carDetailsRepository.findByCarId(car.getId());

        // If CarDetails is not found, return null
        if (carDetailsOptional.isEmpty()) {
            return null;
        }

        // Convert the CarDetails entity to CarDetailsDTO using your apply method
        CarDetails carDetails = carDetailsOptional.get();
        CarDetailsDTO carDetailsDTO = carDetailsDTOMapper.apply(carDetails);  // Using your apply method for conversion

        // Get image keys or default to an empty list if null
        List<String> imageKeys = car.getImageKeys() != null ? car.getImageKeys() : new ArrayList<>();

        // Create and return the CarPreviewDTO using the CarDetailsDTO
        return new CarPreviewDTO(
                car.getId(),                                             // Car ID
                createCarTitle(carDetailsDTO),                            // Car title (make, model, trim)
                carDetailsDTO.price(),                                    // Price from the DTO
                extractYearFromFirstRegistrationDate(carDetailsDTO),     // Year from first registration date from the DTO
                imageKeys                                                 // List of image keys
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
    private CarPreviewDTO mapToCarPreview(CarDetailsDTO carDetailsDTO) {
        // Assuming you have a way to fetch Car entity by ID (carDetailsDTO.getId())
        // If you have a separate repository or service for fetching Car entity, you would use it here.
        Optional<Car> carOptional = carRepository.findById(carDetailsDTO.id());

        if (carOptional.isEmpty()) {
            return null; // Return null if no Car entity is found
        }

        Car car = carOptional.get();

        // Assuming car.getImageKeys() returns a list of image keys for the car
        List<String> imageKeys = car.getImageKeys() != null ? car.getImageKeys() : new ArrayList<>();

        // Map CarDetailsDTO to CarPreviewDTO
        return new CarPreviewDTO(
                carDetailsDTO.id(),                                     // Car ID
                createCarTitle(carDetailsDTO),                           // Generate title from the CarDetailsDTO
                carDetailsDTO.price(),                                   // Price
                extractYearFromFirstRegistrationDate(carDetailsDTO),     // Extract the year of first registration
                imageKeys                                               // Image keys
        );
    }


}