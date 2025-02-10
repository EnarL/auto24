package com.example.auto24.aws;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@Service
public class ImageService {

    private final AmazonS3 s3Client;
    private final String bucketName;

    public ImageService(AmazonS3 s3Client, @Value("${aws.bucket.name}") String bucketName) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
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
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 60); // 1-hour expiry
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucketName, fileKey)
                .withMethod(HttpMethod.GET)
                .withExpiration(expiration);
        return s3Client.generatePresignedUrl(request).toString();
    }

    public void deleteFile(String fileKey) {
        s3Client.deleteObject(bucketName, fileKey);
    }
}

