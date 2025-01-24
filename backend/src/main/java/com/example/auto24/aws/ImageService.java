package com.example.auto24.aws;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    private AmazonS3 s3Client;

    private final Dotenv dotenv;
    private final String bucketName;

    public ImageService() {
        this.dotenv = Dotenv.configure().directory("./backend/").load();
        this.bucketName = dotenv.get("AWS_BUCKET_NAME");
    }

    @Transactional
    public List<String> uploadFiles(final List<MultipartFile> multipartFiles, String carId) {
        List<String> fileKeys = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            String fileKey = generateFileName(multipartFile, carId);
            try {
                final File file = convertMultiPartFileToFile(multipartFile);
                uploadFileToS3Bucket(bucketName, file, fileKey);
                file.deleteOnExit();  // To remove the file locally created in the project folder.
                fileKeys.add(fileKey);
            } catch (final AmazonServiceException ex) {
                System.out.println("Error while uploading file = " + ex.getMessage());
            }
        }
        return fileKeys;
    }

    private String generateFileName(MultipartFile multipartFile, String userId) {
        String originalFileName = multipartFile.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        return userId + "_" + UUID.randomUUID().toString() + fileExtension;
    }

    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
            System.out.println("Error converting the multi-part file to file= " + ex.getMessage());
        }
        return file;
    }

    @Transactional
    protected void uploadFileToS3Bucket(final String bucketName, final File file, final String fileName) {
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, file);
        s3Client.putObject(putObjectRequest);
    }

    public URL generatePresignedUrl(String fileKey) {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60; // 1 hour
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, fileKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);
        return s3Client.generatePresignedUrl(generatePresignedUrlRequest);
    }
    public byte[] downloadFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
        return fileName + " removed ...";
    }

    public List<byte[]> downloadAllFiles() {
        List<byte[]> filesContent = new ArrayList<>();
        ObjectListing objectListing = s3Client.listObjects(bucketName);
        for (S3ObjectSummary os : objectListing.getObjectSummaries()) {
            filesContent.add(downloadFile(os.getKey()));
        }
        return filesContent;
    }
}