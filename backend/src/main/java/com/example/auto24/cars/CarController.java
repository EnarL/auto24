package com.example.auto24.cars;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping
    public List<CarDTO> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{carId}")
    public CarDTO getCarById(@PathVariable String carId) {
        return carService.getCarById(carId);
    }

    @PostMapping
    public ResponseEntity<?> createCar(HttpServletRequest jwt) {
        carService.saveCar(jwt);
        return ResponseEntity.ok("Car created successfully");
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCarListing(@RequestHeader("Authorization") String authorizationHeader,
                                                   @RequestBody CarDetailsDTO carDetailsDTO) {
        String userId = carService.extractUserIdFromToken(authorizationHeader);

        carService.createCarListing(carDetailsDTO, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body("Car listing created successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car deleted successfully");
    }
}