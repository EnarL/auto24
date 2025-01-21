package com.example.auto24.aws;

import com.example.auto24.cars.Car;
import com.example.auto24.cars.CarRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.List;

@RequestMapping("/productImages")
@RestController
public class ImageController {
    @Autowired
    private ImageService service;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private Dotenv dotenv;

    @GetMapping("/check-env")
    public String checkEnv() {
        String accessKey = dotenv.get("AWS_ACCESS_KEY_ID");
        String secretKey = dotenv.get("AWS_SECRET_ACCESS_KEY");
        String region = dotenv.get("AWS_REGION");
        String bucketName = dotenv.get("AWS_BUCKET_NAME");

        // Log the values to check if they are correctly loaded
        System.out.println("AWS_ACCESS_KEY_ID: " + accessKey);
        System.out.println("AWS_SECRET_ACCESS_KEY: " + secretKey);
        System.out.println("AWS_REGION: " + region);
        System.out.println("AWS_BUCKET_NAME: " + bucketName);

        return "Environment variables are loaded. Check the logs for details.";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> files, @RequestParam("userId") String userId) {
        List<String> fileUrls = service.uploadFiles(files, userId);

        Car car = new Car();
        car.setImageUrls(fileUrls);
        car.setOwnerId(userId);
        carRepository.save(car);

        return ResponseEntity.ok(fileUrls);
    }
    @GetMapping("/download/{fileName}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> downloadFile(@PathVariable String fileName) {
        URL url = service.generatePresignedUrl(fileName);
        return ResponseEntity.ok(url.toString());
    }



    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
    }

    @GetMapping("/downloadAll")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<ByteArrayResource>> downloadAllFiles() {
        List<byte[]> filesData = service.downloadAllFiles();
        List<ByteArrayResource> resources = filesData.stream()
                .map(ByteArrayResource::new)
                .toList();
        return ResponseEntity
                .ok()
                .body(resources);
    }
}