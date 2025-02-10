package com.example.auto24.cars;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        List<CarDetailsDTO> cars = carDetailsService.searchCars(carDetailsDTO);
        return ResponseEntity.ok(cars);
    }

    @GetMapping
    public List<CarDetails> getAllCarDetails() {
        return carDetailsService.getAllCarDetails();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDetailsDTO> getCarDetailsById(@PathVariable String id) {
        // Directly return the result of the service method
        return ResponseEntity.of(carDetailsService.getCarDetailsById(id));
    }



    @PostMapping
    public CarDetails createCarDetails(@RequestBody CarDetails carDetails) {
        return carDetailsService.createCarDetails(carDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDetails> updateCarDetails(@PathVariable String id, @RequestBody CarDetails carDetailsDetails) {
        Optional<CarDetails> updatedCarDetails = carDetailsService.updateCarDetails(id, carDetailsDetails);
        return updatedCarDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarDetails(@PathVariable String id) {
        carDetailsService.deleteCarDetails(id);
        return ResponseEntity.noContent().build();
    }
}