package com.example.auto24;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class ImageUploadService {

    @Autowired
    private AmazonS3 s3Client;

    private final Dotenv dotenv;
    private final String bucketName;
    private final String bucketRegion;
    private String fileName; // for returning the url

    public ImageUploadService() {
        this.dotenv = Dotenv.configure().directory("./backend/").load();
        this.bucketName = dotenv.get("AWS_BUCKET_NAME");
        this.bucketRegion = dotenv.get("AWS_REGION");
    }

    @Transactional
    public String uploadFile(final MultipartFile multipartFile) {
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            fileName = uploadFileToS3Bucket(bucketName, file);
            file.deleteOnExit();  // To remove the file locally created in the project folder.
        } catch (final AmazonServiceException ex) {
            System.out.println("Error while uploading file = " + ex.getMessage());
        }

        return String.format("https://s3.%s.amazonaws.com/%s/%s", bucketRegion, bucketName, fileName);
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
    protected String uploadFileToS3Bucket(final String bucketName, final File file) {
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, file.getName(), file);
        s3Client.putObject(putObjectRequest);
        return file.getName();
    }
}