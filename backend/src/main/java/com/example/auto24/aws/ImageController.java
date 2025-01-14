package com.example.auto24.aws;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RequestMapping("/productImages")
@RestController
public class ImageController {
    @Autowired
    private ImageService service;

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
    public String createProduct(@RequestParam("file") MultipartFile file) throws Exception{
        service.uploadFile(file);
        return "File uploaded successfully";
    }
    @GetMapping("/download/{fileName}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] data = service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
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