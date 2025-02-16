package com.example.auto24.cars;

import com.example.auto24.users.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("user/preview")
    public ResponseEntity<List<CarPreviewDTO>> getCarDetailsPreview() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = userPrincipal != null ? userPrincipal.getUserId() : null;

        if (userId != null) {
            List<CarPreviewDTO> carPreviews = carDetailsService.getCarPreviewsForUser(userId);
            return ResponseEntity.ok(carPreviews);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.emptyList());
        }
    }

//    @GetMapping("/search")
//    public ResponseEntity<List<CarPreviewDTO>> searchCars(@RequestBody CarDetailsDTO carDetailsDTO) {
//        List<CarPreviewDTO> carPreviews = carDetailsService.searchCars(carDetailsDTO)
//                .stream()
//                .map(this::mapToCarPreview)
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(carPreviews);
//    }


//    @GetMapping
//    public List<CarDetails> getAllCarDetails() {
//        return carDetailsService.getAllCarDetails();
//    }

//    @GetMapping("/{id}")
//    public ResponseEntity<CarDetailsDTO> getCarDetailsById(@PathVariable String id) {
//        return ResponseEntity.of(carDetailsService.getCarDetailsById(id));
//    }
//
//    @PostMapping
//    public ResponseEntity<String> createCarDetails(@RequestBody CarDetails carDetails) {
//        carDetailsService.createCarDetails(carDetails);
//        return ResponseEntity.status(201).body("Car details created successfully");
//    }
//    @PutMapping("/{id}")
//    public ResponseEntity<String> updateCarDetails(@PathVariable String id, @RequestBody CarDetails carDetailsDetails) {
//        carDetailsService.updateCarDetails(id, carDetailsDetails);
//        return ResponseEntity.ok("Car details updated successfully");
//    }
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteCarDetails(@PathVariable String id) {
//        carDetailsService.deleteCarDetails(id);
//        return ResponseEntity.noContent().build();
//    }
}
