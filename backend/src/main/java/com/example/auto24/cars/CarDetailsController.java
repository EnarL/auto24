package com.example.auto24.cars;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car-details")
public class CarDetailsController {

    private final CarDetailsService carDetailsService;

    public CarDetailsController(CarDetailsService carDetailsService) {
        this.carDetailsService = carDetailsService;
    }

    @GetMapping("/preview")
    public List<CarPreviewDTO> getAllCarDetailsPreview() {
        return carDetailsService.getAllCarsPreview();
    }

    @GetMapping("/preview/{id}")
    public ResponseEntity<CarPreviewDTO> getCarDetailsPreviewById(@PathVariable String id) {
        return ResponseEntity.of(carDetailsService.getCarDetailsPreviewById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<CarDetailsDTO>> searchCars(@RequestBody CarDetailsDTO carDetailsDTO) {
        return ResponseEntity.ok(carDetailsService.searchCars(carDetailsDTO));
    }

    @GetMapping
    public List<CarDetails> getAllCarDetails() {
        return carDetailsService.getAllCarDetails();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDetailsDTO> getCarDetailsById(@PathVariable String id) {
        return ResponseEntity.of(carDetailsService.getCarDetailsById(id));
    }

    @PostMapping
    public ResponseEntity<String> createCarDetails(@RequestBody CarDetails carDetails) {
        carDetailsService.createCarDetails(carDetails);
        return ResponseEntity.status(201).body("Car details created successfully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCarDetails(@PathVariable String id, @RequestBody CarDetails carDetailsDetails) {
        carDetailsService.updateCarDetails(id, carDetailsDetails);
        return ResponseEntity.ok("Car details updated successfully");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCarDetails(@PathVariable String id) {
        carDetailsService.deleteCarDetails(id);
        return ResponseEntity.noContent().build();
    }
}
