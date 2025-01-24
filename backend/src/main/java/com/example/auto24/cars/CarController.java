package com.example.auto24.cars;

import com.example.auto24.jwt.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
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
    public ResponseEntity<?> createCar(@RequestBody CarRegisterRequest request, HttpServletRequest jwt) {
        carService.saveCar(request, jwt);
        return ResponseEntity.ok("Car created successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car deleted successfully");
    }
}