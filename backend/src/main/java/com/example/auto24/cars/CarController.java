package com.example.auto24.cars;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCarListing(@RequestBody CarListingRequest carListingRequest) {
        String carId = carService.createCarListing(carListingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(carId);
    }

    @GetMapping("/carlisting/{id}")
    public ResponseEntity<CarListingResponse> getCarListing(@PathVariable String id) {
        Optional<CarListingResponse> carListingResponse = carService.getCarListingById(id);
        return carListingResponse
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCarListing(@PathVariable String id,
                                                   @RequestBody CarListingRequest carListingRequest) {
        carService.updateCarListing(id, carListingRequest);
        return ResponseEntity.ok("Car listing updated successfully");
    }

    @PutMapping("/{id}/extendExpiration")
    public ResponseEntity<String> extendCarExpirationDate(@PathVariable String id, @RequestParam int months) {
        carService.extendCarExpirationDate(id, months);
        return ok("Car expiration date extended successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable String id) {
        carService.deleteCarListing(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countCars() {
        return ResponseEntity.ok(carService.countCars());
    }

    @PatchMapping("/activate/{id}")
    public ResponseEntity<String> changeCarListingActiveStatus(@PathVariable String id){
        boolean isActive = carService.toggleCarListingStatus(id);
        return ResponseEntity.ok(isActive ? "Listing activated" : "Listing deactivated");
    }

    @GetMapping("/OwnerOtherSales/{carId}")
    public ResponseEntity<List<CarPreviewDTO>> getOwnerOtherSales(@PathVariable String carId) {
        List<CarPreviewDTO> carPreviews = carService.getOwnerOtherSales(carId);
        return ResponseEntity.ok(carPreviews);
    }



}