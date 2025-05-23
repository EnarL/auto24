package com.example.auto24.aws;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/productImages")
@RestController
public class ImageController {

    private final ImageService service;

    public ImageController(ImageService service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> files,
                                                    @RequestParam("id") String id) {
        return service.uploadFilesForCar(files, id);
    }

    @GetMapping("/getCarImages/{id}")
    public ResponseEntity<List<String>> getCarImages(@PathVariable String id) {
        return service.getCarImageUrls(id);

    }

    @DeleteMapping("/delete/{id}/{fileKey}")
    public ResponseEntity<String> deleteFile(@PathVariable String id,
                                             @PathVariable String fileKey) {
        return service.deleteCarImage(id, fileKey);
    }
    @PostMapping("/fix-content-types")
    public ResponseEntity<String> fixImageContentTypes() {
        try {
            service.fixExistingImageContentTypes();
            return ResponseEntity.ok("Successfully fixed content types for existing images");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fixing content types: " + e.getMessage());
        }
    }
    @PostMapping("/add-cache-headers")
    public ResponseEntity<String> addCacheHeaders() {
        try {
            service.addCacheHeadersToExistingImages();
            return ResponseEntity.ok("Successfully added cache headers to existing images");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding cache headers: " + e.getMessage());
        }
    }
}
