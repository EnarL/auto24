package com.example.auto24.cars;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/car-details")
public class CarDetailsController {

    private final CarDetailsService carDetailsService;

    public CarDetailsController(CarDetailsService carDetailsService) {
        this.carDetailsService = carDetailsService;
    }

    @GetMapping("/preview")
    public ResponseEntity<List<CarPreviewDTO>> getAllCarDetailsPreview() {
        try {
            List<CarPreviewDTO> carDetails = carDetailsService.getAllCarsPreviewWithImages();
            return ResponseEntity.ok(carDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<CarDTO>> getCarDetailsForUser() {
            return ResponseEntity.ok(carDetailsService.getCarDetailsForUser());
    }
    @GetMapping("user/preview")
    public ResponseEntity<List<CarPreviewDTO>> getCarDetailsPreviewForUser() {
        return ResponseEntity.ok(carDetailsService.getCarPreviewsForUser());
    }
    @GetMapping("/search")
    public ResponseEntity<List<CarPreviewDTO>> searchCars(@RequestParam Map<String, String> searchParams) {
        return ResponseEntity.ok(carDetailsService.searchCars(searchParams));
    }
}
