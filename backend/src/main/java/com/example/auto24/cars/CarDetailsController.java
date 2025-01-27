package com.example.auto24.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/car-details")
public class CarDetailsController {

    @Autowired
    private CarDetailsService carDetailsService;

    @GetMapping("/search")
    public ResponseEntity<List<CarDetails>> searchCarDetails(@RequestParam Map<String, String> allParams) {
        Map<String, Object> criteria = new HashMap<>(allParams);
        List<CarDetails> carDetails = carDetailsService.searchCarDetails(criteria);
        return ResponseEntity.ok(carDetails);
    }

}
