package com.example.auto24.aws;

import com.amazonaws.AmazonServiceException;
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
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private AmazonS3 s3Client;

    private final Dotenv dotenv;
    private final String bucketName;
    private final String bucketRegion;
    private String fileName;

    public ImageService() {
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