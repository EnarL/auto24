package com.example.auto24.aws;

import com.amazonaws.HttpMethod;
import java.util.Calendar;
import com.amazonaws.services.s3.AmazonS3;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.auto24.cars.Car;
import com.example.auto24.cars.CarRepository;
import com.example.auto24.users.SecurityUtils;
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
                    Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf("."));

            try {
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());

                // Set correct Content-Type based on file extension
                String contentType = getContentType(file.getOriginalFilename());
                metadata.setContentType(contentType);

                // Add cache headers - this is the key addition!
                metadata.setCacheControl("max-age=31536000, public, immutable");

                // Optional: Set expires header (1 year from now)
                Calendar calendar = Calendar.getInstance();
                calendar.add(Calendar.YEAR, 1);
                metadata.setExpirationTime(calendar.getTime());

                s3Client.putObject(new PutObjectRequest(bucketName, fileKey, file.getInputStream(), metadata));
                fileKeys.add(fileKey);
            } catch (IOException e) {
                throw new RuntimeException("Error uploading file", e);
            }
        }
        return fileKeys;
    }
    public String getPublicUrl(String fileKey) {
        return "https://" + bucketName + ".s3.eu-north-1.amazonaws.com/car-images/" + fileKey;
    }


    private String getContentType(String filename) {
        String extension = filename.toLowerCase().substring(filename.lastIndexOf(".") + 1);
        switch (extension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            case "webp":
                return "image/webp";
            case "bmp":
                return "image/bmp";
            case "tiff":
            case "tif":
                return "image/tiff";
            default:
                return "application/octet-stream";
        }
    }

    public void deleteFile(String fileKey) {
        s3Client.deleteObject(bucketName, fileKey);
    }

    public ResponseEntity<List<String>> getCarImageUrls(String carId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));

        List<String> publicUrls = car.getImageKeys().stream()
                .map(this::getPublicUrl)
                .toList();


        return ResponseEntity.ok(publicUrls);
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
    // Add this method to fix existing images with wrong Content-Type
    public void fixExistingImageContentTypes() {
        try {
            // List all objects in the bucket
            var listObjectsRequest = new com.amazonaws.services.s3.model.ListObjectsV2Request()
                    .withBucketName(bucketName);

            var result = s3Client.listObjectsV2(listObjectsRequest);

            for (var object : result.getObjectSummaries()) {
                String key = object.getKey();

                // Skip if not an image file
                if (!isImageFile(key)) {
                    continue;
                }

                // Get current object metadata
                var currentMetadata = s3Client.getObjectMetadata(bucketName, key);

                // Check if Content-Type is already correct
                String correctContentType = getContentType(key);
                if (correctContentType.equals(currentMetadata.getContentType())) {
                    continue; // Already correct
                }

                // Copy object to itself with correct Content-Type
                var copyRequest = new com.amazonaws.services.s3.model.CopyObjectRequest(
                        bucketName, key, bucketName, key)
                        .withNewObjectMetadata(createMetadataWithContentType(key, currentMetadata));

                s3Client.copyObject(copyRequest);
                System.out.println("Fixed Content-Type for: " + key);
            }
        } catch (Exception e) {
            System.err.println("Error fixing content types: " + e.getMessage());
        }
    }

    private boolean isImageFile(String filename) {
        String extension = filename.toLowerCase().substring(filename.lastIndexOf(".") + 1);
        return Arrays.asList("jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff", "tif").contains(extension);
    }

    private ObjectMetadata createMetadataWithContentType(String key, ObjectMetadata currentMetadata) {
        ObjectMetadata newMetadata = new ObjectMetadata();

        // Copy existing metadata
        newMetadata.setContentLength(currentMetadata.getContentLength());
        if (currentMetadata.getCacheControl() != null) {
            newMetadata.setCacheControl(currentMetadata.getCacheControl());
        }

        // Set correct Content-Type
        newMetadata.setContentType(getContentType(key));

        return newMetadata;
    }
    public void addCacheHeadersToExistingImages() {
        try {
            // List all objects in the bucket
            var listObjectsRequest = new com.amazonaws.services.s3.model.ListObjectsV2Request()
                    .withBucketName(bucketName);

            var result = s3Client.listObjectsV2(listObjectsRequest);

            for (var object : result.getObjectSummaries()) {
                String key = object.getKey();

                // Skip if not an image file
                if (!isImageFile(key)) {
                    continue;
                }

                // Get current object metadata
                var currentMetadata = s3Client.getObjectMetadata(bucketName, key);

                // Check if cache headers are already set
                if (currentMetadata.getCacheControl() != null &&
                        currentMetadata.getCacheControl().contains("max-age")) {
                    continue; // Already has cache headers
                }

                // Create new metadata with cache headers
                ObjectMetadata newMetadata = new ObjectMetadata();
                newMetadata.setContentLength(currentMetadata.getContentLength());
                newMetadata.setContentType(currentMetadata.getContentType());

                // Add cache headers
                newMetadata.setCacheControl("max-age=31536000, public, immutable");

                // Set expires header (1 year from now)
                Calendar calendar = Calendar.getInstance();
                calendar.add(Calendar.YEAR, 1);
                newMetadata.setExpirationTime(calendar.getTime());

                // Copy object to itself with new metadata
                var copyRequest = new com.amazonaws.services.s3.model.CopyObjectRequest(
                        bucketName, key, bucketName, key)
                        .withNewObjectMetadata(newMetadata);

                s3Client.copyObject(copyRequest);
                System.out.println("Added cache headers to: " + key);
            }
        } catch (Exception e) {
            System.err.println("Error adding cache headers: " + e.getMessage());
        }
    }
}

