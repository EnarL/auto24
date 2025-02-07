package com.example.auto24.cars.extra_info;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("cars/car-extra-info")
public class CarExtraInfoController {

    @Autowired
    private CarExtraInfoRepository carExtraInfoRepository;

    @GetMapping
    public List<CarExtraInfo> getAllCarExtraInfo() {
        return carExtraInfoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarExtraInfo> getCarExtraInfoById(@PathVariable String id) {
        Optional<CarExtraInfo> carExtraInfo = carExtraInfoRepository.findById(id);
        return carExtraInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<CarExtraInfo> getCarExtraInfoByCarId(@PathVariable String carId) {
        Optional<CarExtraInfo> carExtraInfo = carExtraInfoRepository.findByCarId(carId);
        return carExtraInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CarExtraInfo createCarExtraInfo(@RequestBody CarExtraInfo carExtraInfo) {
        return carExtraInfoRepository.save(carExtraInfo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarExtraInfo> updateCarExtraInfo(@PathVariable String id, @RequestBody CarExtraInfo carExtraInfoDetails) {
        Optional<CarExtraInfo> carExtraInfo = carExtraInfoRepository.findById(id);
        if (carExtraInfo.isPresent()) {
            CarExtraInfo updatedCarExtraInfo = carExtraInfo.get();
            updatedCarExtraInfo.setCarId(carExtraInfoDetails.getCarId());
            updatedCarExtraInfo.setSafetyAndSecurity(carExtraInfoDetails.getSafetyAndSecurity());
            updatedCarExtraInfo.setLights(carExtraInfoDetails.getLights());
            updatedCarExtraInfo.setTiresAndWheels(carExtraInfoDetails.getTiresAndWheels());
            updatedCarExtraInfo.setSteering(carExtraInfoDetails.getSteering());
            updatedCarExtraInfo.setSeats(carExtraInfoDetails.getSeats());
            updatedCarExtraInfo.setInteriorFeatures(carExtraInfoDetails.getInteriorFeatures());
            updatedCarExtraInfo.setSportFeatures(carExtraInfoDetails.getSportFeatures());
            updatedCarExtraInfo.setComfortFeatures(carExtraInfoDetails.getComfortFeatures());
            updatedCarExtraInfo.setAudioVideoCommunication(carExtraInfoDetails.getAudioVideoCommunication());
            updatedCarExtraInfo.setAdditional(carExtraInfoDetails.getAdditional());
            return ResponseEntity.ok(carExtraInfoRepository.save(updatedCarExtraInfo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarExtraInfo(@PathVariable String id) {
        Optional<CarExtraInfo> carExtraInfo = carExtraInfoRepository.findById(id);
        if (carExtraInfo.isPresent()) {
            carExtraInfoRepository.delete(carExtraInfo.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}