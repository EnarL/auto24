package com.example.auto24.aws;

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
}
