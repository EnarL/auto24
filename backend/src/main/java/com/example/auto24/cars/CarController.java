package com.example.auto24.cars;

import com.example.auto24.users.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    //ADMIN
    @GetMapping
    public List<CarDTO> getAllCars() {
        return carService.getAllCars();
    }
    //current USER or ADMIN
    @GetMapping("/CarsByUser")
    public List<CarDTO> getAllCarsByOwnerId() {;
        return carService.getAllCarsByOwnerId();
    }
    //Owner of car or ADMIN
    @GetMapping("/{id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable String id) {
        return ResponseEntity.ok(carService.getCarById(id));
    }
    //User or if not user, then create user first and then create car
    @PostMapping("/create")
    public ResponseEntity<String> createCarListing(@AuthenticationPrincipal UserPrincipal userDetails,
                                                   @RequestBody CarListingRequest carListingRequest) {
        carService.createCarListing(userDetails, carListingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Car listing created successfully");
    }
    @GetMapping("/carlisting/{id}")
    public ResponseEntity<CarListingResponse> getCarListing(@PathVariable String id) {
        Optional<CarListingResponse> carListingResponse = carService.getCarListingById(id);
        return carListingResponse
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/extendExpiration")
    public ResponseEntity<String> extendCarExpirationDate(@PathVariable String id, @RequestParam int months) {
        carService.extendCarExpirationDate(id, months);
        return ok("Car expiration date extended successfully");
    }
    //Owner of car or ADMIN
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

}