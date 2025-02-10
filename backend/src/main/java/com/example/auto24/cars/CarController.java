package com.example.auto24.cars;

import com.example.auto24.cars.extra_info.*;
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
    private final CarDetailsService carDetailsService;
    private final CarExtraInfoService carExtraInfoService;

    public CarController(CarService carService, CarDetailsService carDetailsService, CarExtraInfoService carExtraInfoService) {
        this.carService = carService;
        this.carDetailsService = carDetailsService;
        this.carExtraInfoService = carExtraInfoService;
    }

    //lisa mingi preview endpoint, kus saab näha kõiki autosid, aga ainult nende pealkirju ja hindu
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
        Optional<CarListingResponse> carListingResponseOpt = carService.getCarListingById(id);

        // Return 404 if the response is not present (i.e., either CarDetails or CarExtraInfo is missing)
        return carListingResponseOpt
                .map(ResponseEntity::ok) // If present, return OK with the response
                .orElseGet(() -> ResponseEntity.notFound().build()); // Otherwise, return a 404 Not Found
    }



    @PutMapping("/{id}/extendExpiration")
    public ResponseEntity<String> extendCarExpirationDate(@PathVariable String id, @RequestParam int months) {
        carService.extendCarExpirationDate(id, months);
        return ok("Car expiration date extended successfully");
    }
    //Owner of car or ADMIN
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
        return ok("Car deleted successfully");
    }
}