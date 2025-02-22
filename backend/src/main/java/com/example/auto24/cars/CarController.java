package com.example.auto24.cars;

import com.example.auto24.users.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

//public
    @PostMapping("/create")
    public ResponseEntity<String> createCarListing(@RequestBody CarListingRequest carListingRequest) {
        carService.createCarListing(carListingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Car listing created successfully");
    }
//public
    @GetMapping("/carlisting/{id}")
    public ResponseEntity<CarListingResponse> getCarListing(@PathVariable String id) {
        Optional<CarListingResponse> carListingResponse = carService.getCarListingById(id);
        return carListingResponse
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    //cur user
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCarListing(@PathVariable String id,
                                                   @RequestBody CarListingRequest carListingRequest) {
        carService.updateCarListing(id, carListingRequest);
        return ResponseEntity.ok("Car listing updated successfully");
    }
//cur user
    @PutMapping("/{id}/extendExpiration")
    public ResponseEntity<String> extendCarExpirationDate(@PathVariable String id, @RequestParam int months) {
        carService.extendCarExpirationDate(id, months);
        return ok("Car expiration date extended successfully");
    }
//cur user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable String id) {
        carService.deleteCarListing(id);
        return ResponseEntity.noContent().build();
    }
    //public
    @GetMapping("/count")
    public ResponseEntity<Long> countCars() {
        return ResponseEntity.ok(carService.countCars());
    }

}