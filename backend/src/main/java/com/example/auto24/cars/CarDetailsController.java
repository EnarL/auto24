package com.example.auto24.cars;

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
    public List<CarPreviewDTO> getAllCarDetailsPreview() {
        return carDetailsService.getAllCarsPreview();
    }
    @GetMapping("/users")
    public List<CarDTO> getCarDetailsForUser() {
            return carDetailsService.getCarDetailsForUser();
    }
//    @GetMapping("user/preview")
//    public List<CarPreviewDTO> getCarDetailsPreview() {
//        return carDetailsService.getCarPreviewsForUser();
//    }
    @GetMapping("/search")
    public List<CarPreviewDTO> searchCars(@RequestParam Map<String, String> searchParams) {
        return carDetailsService.searchCars(searchParams);
    }
}
