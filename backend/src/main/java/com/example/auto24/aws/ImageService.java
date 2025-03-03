package com.example.auto24.aws;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.auto24.cars.Car;
import com.example.auto24.cars.CarRepository;
import com.example.auto24.users.SecurityUtils;
import com.example.auto24.users.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@Service
public class ImageService {

    private final AmazonS3 s3Client;
    private final String bucketName;
    private final CarRepository carRepository;

    public ImageService(AmazonS3 s3Client, @Value("${AWS_BUCKET_NAME}") String bucketName, CarRepository carRepository) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.carRepository = carRepository;
    }

    public List<String> uploadFiles(List<MultipartFile> files, String id) {

        List<String> fileKeys = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileKey = id + "_" + UUID.randomUUID() +
                    file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            try {
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());
                s3Client.putObject(new PutObjectRequest(bucketName, fileKey, file.getInputStream(), metadata));
                fileKeys.add(fileKey);
            } catch (IOException e) {
                throw new RuntimeException("Error uploading file", e);
            }
        }
        return fileKeys;
    }
    public String generatePresignedUrl(String fileKey) {
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 60);
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucketName, fileKey)
                .withMethod(HttpMethod.GET)
                .withExpiration(expiration);
        return s3Client.generatePresignedUrl(request).toString();
    }

    public void deleteFile(String fileKey) {
        s3Client.deleteObject(bucketName, fileKey);
    }

    public ResponseEntity<List<String>> getCarImageUrls(String carId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        List<String> presignedUrls = car.getImageKeys().stream()
                .map(this::generatePresignedUrl)
                .toList();

        return ResponseEntity.ok(presignedUrls);
    }
    public ResponseEntity<String> deleteCarImage(String carId, String fileKey) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        deleteFile(fileKey);
        car.getImageKeys().remove(fileKey);
        carRepository.save(car);

        return ResponseEntity.ok("Image deleted successfully.");
    }

    public ResponseEntity<List<String>> uploadFilesForCar(List<MultipartFile> files, String carId) {
        String userId = SecurityUtils.getAuthenticatedUserId();
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        if (!car.getOwnerId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        List<String> fileKeys = uploadFiles(files, carId);
        car.getImageKeys().addAll(fileKeys);
        carRepository.save(car);

        return ResponseEntity.ok(fileKeys);
    }
}

