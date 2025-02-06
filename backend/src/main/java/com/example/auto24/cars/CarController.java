package com.example.auto24.cars;

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

    //ADMIN
    @GetMapping
    public List<CarDTO> getAllCars() {
        return carService.getAllCars();
    }

    //current USER or ADMIN
    @GetMapping("/CarsByUser")
    public List<CarDTO> getAllCarsByOwnerId(@RequestHeader("Authorization") String authorizationHeader){
        return carService.getAllCarsByOwenrId(authorizationHeader);
    }

    //Owner of car or ADMIN
    @GetMapping("/{carId}")
    public CarDTO getCarById(@PathVariable String carId) {
        return carService.getCarById(carId);
    }
    //User or if not user, then create user first and then create car
    @PostMapping("/create")
    public ResponseEntity<String> createCarListing(@RequestHeader("Authorization") String authorizationHeader,
                                                   @RequestBody CarListingRequest carListingRequest) {
        carService.createCarListing(authorizationHeader, carListingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Car listing created successfully");
    }
    //Owner of car or ADMIN
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car deleted successfully");
    }


}