package com.example.auto24.aws;

import com.example.auto24.cars.Car;
import com.example.auto24.cars.CarRepository;
import com.example.auto24.users.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/productImages")
@RestController
public class ImageController {

    private final ImageService service;
    private final CarRepository carRepository;

    public ImageController(ImageService service, CarRepository carRepository) {
        this.service = service;
        this.carRepository = carRepository;
    }

    // ✅ 1️⃣ Upload Images (Find the Car Using the Authenticated User)
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> files,
                                                    @RequestParam("id") String id,
                                                    @AuthenticationPrincipal UserPrincipal userDetails) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        if (!car.getOwnerId().equals(userDetails.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        List<String> fileKeys = service.uploadFiles(files, id);
        car.getImageKeys().addAll(fileKeys);
        carRepository.save(car);

        return ResponseEntity.ok(fileKeys);
    }

    @GetMapping("/getCarImages/{id}")
    public ResponseEntity<List<String>> getCarImages(@PathVariable String id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        // Generate presigned URLs for car images
        List<String> presignedUrls = car.getImageKeys().stream()
                .map(service::generatePresignedUrl)
                .toList();

        return ResponseEntity.ok(presignedUrls);
    }

    @DeleteMapping("/delete/{id}/{fileKey}")
    public ResponseEntity<String> deleteFile(@PathVariable String id, @PathVariable String fileKey,
                                             @AuthenticationPrincipal UserPrincipal userDetails) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        // 🔒 Ensure user owns this car
        if (!car.getOwnerId().equals(userDetails.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized to delete this image.");
        }

        service.deleteFile(fileKey);
        car.getImageKeys().remove(fileKey);
        carRepository.save(car);

        return ResponseEntity.ok("Image deleted successfully.");
    }
}
