package com.example.auto24.cars;

import com.example.auto24.users.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
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
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = userPrincipal != null ? userPrincipal.getUserId() : null;
        if (userId != null) {
            return carDetailsService.getCarDetailsForUser(userId);
        } else {
            return Collections.emptyList();
        }
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
    @GetMapping("/search")
    public List<CarPreviewDTO> searchCars(@RequestParam Map<String, String> searchParams) {
        return carDetailsService.searchCars(searchParams);
    }
}
