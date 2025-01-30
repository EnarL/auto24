package com.example.auto24.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/car-details")
public class CarDetailsController {

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    @GetMapping
    public List<CarDetails> getAllCarDetails() {
        return carDetailsRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDetails> getCarDetailsById(@PathVariable String id) {
        Optional<CarDetails> carDetails = carDetailsRepository.findById(id);
        return carDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CarDetails createCarDetails(@RequestBody CarDetails carDetails) {
        return carDetailsRepository.save(carDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDetails> updateCarDetails(@PathVariable String id, @RequestBody CarDetails carDetailsDetails) {
        Optional<CarDetails> carDetails = carDetailsRepository.findById(id);
        if (carDetails.isPresent()) {
            CarDetails updatedCarDetails = carDetails.get();
            updatedCarDetails.setCarId(carDetailsDetails.getCarId());
            updatedCarDetails.setVehicleType(carDetailsDetails.getVehicleType());
            updatedCarDetails.setBodyType(carDetailsDetails.getBodyType());
            updatedCarDetails.setBodyTypeDetail(carDetailsDetails.getBodyTypeDetail());
            updatedCarDetails.setModel(carDetailsDetails.getModel());
            updatedCarDetails.setModelName(carDetailsDetails.getModelName());
            updatedCarDetails.setModelGeneration(carDetailsDetails.getModelGeneration());
            updatedCarDetails.setModelTrim(carDetailsDetails.getModelTrim());
            updatedCarDetails.setPrice(carDetailsDetails.getPrice());
            updatedCarDetails.setFirstRegistrationDate(carDetailsDetails.getFirstRegistrationDate());
            updatedCarDetails.setIncludesRegistrationFee(carDetailsDetails.isIncludesRegistrationFee());
            updatedCarDetails.setDiscountPrice(carDetailsDetails.isDiscountPrice());
            updatedCarDetails.setExportPrice(carDetailsDetails.isExportPrice());
            updatedCarDetails.setOdometerReading(carDetailsDetails.getOdometerReading());
            updatedCarDetails.setHasServiceBook(carDetailsDetails.isHasServiceBook());
            updatedCarDetails.setVinCode(carDetailsDetails.getVinCode());
            updatedCarDetails.setRegistrationNumber(carDetailsDetails.getRegistrationNumber());
            updatedCarDetails.setTransmission(carDetailsDetails.getTransmission());
            updatedCarDetails.setDriveType(carDetailsDetails.getDriveType());
            updatedCarDetails.setEngineCapacityLiters(carDetailsDetails.getEngineCapacityLiters());
            updatedCarDetails.setEngineCapacityCubicCentimeters(carDetailsDetails.getEngineCapacityCubicCentimeters());
            updatedCarDetails.setEngineConfiguration(carDetailsDetails.getEngineConfiguration());
            updatedCarDetails.setEngineDetails(carDetailsDetails.getEngineDetails());
            updatedCarDetails.setEnginePowerKW(carDetailsDetails.getEnginePowerKW());
            updatedCarDetails.setEnginePowerHP(carDetailsDetails.getEnginePowerHP());
            updatedCarDetails.setFuelType(carDetailsDetails.getFuelType());
            updatedCarDetails.setFuelTankCapacity(carDetailsDetails.getFuelTankCapacity());
            updatedCarDetails.setFuelConsumptionHighway(carDetailsDetails.getFuelConsumptionHighway());
            updatedCarDetails.setFuelConsumptionCity(carDetailsDetails.getFuelConsumptionCity());
            updatedCarDetails.setFuelConsumptionCombined(carDetailsDetails.getFuelConsumptionCombined());
            updatedCarDetails.setFuelConsumptionStandard(carDetailsDetails.getFuelConsumptionStandard());
            updatedCarDetails.setCo2Emissions(carDetailsDetails.getCo2Emissions());
            updatedCarDetails.setSeatingCapacity(carDetailsDetails.getSeatingCapacity());
            updatedCarDetails.setNumberOfDoors(carDetailsDetails.getNumberOfDoors());
            updatedCarDetails.setHasWarranty(carDetailsDetails.isHasWarranty());
            updatedCarDetails.setAccidentDamaged(carDetailsDetails.isAccidentDamaged());
            updatedCarDetails.setColor(carDetailsDetails.getColor());
            updatedCarDetails.setMetallicColor(carDetailsDetails.isMetallicColor());
            updatedCarDetails.setColorDetail(carDetailsDetails.getColorDetail());
            updatedCarDetails.setCurbWeight(carDetailsDetails.getCurbWeight());
            updatedCarDetails.setGrossWeight(carDetailsDetails.getGrossWeight());
            updatedCarDetails.setPayloadCapacity(carDetailsDetails.getPayloadCapacity());
            updatedCarDetails.setBrakedTrailerWeight(carDetailsDetails.getBrakedTrailerWeight());
            updatedCarDetails.setUnbrakedTrailerWeight(carDetailsDetails.getUnbrakedTrailerWeight());
            updatedCarDetails.setWheelbase(carDetailsDetails.getWheelbase());
            updatedCarDetails.setLength(carDetailsDetails.getLength());
            updatedCarDetails.setWidth(carDetailsDetails.getWidth());
            updatedCarDetails.setHeight(carDetailsDetails.getHeight());
            updatedCarDetails.setAcceleration0To100(carDetailsDetails.getAcceleration0To100());
            updatedCarDetails.setTopSpeed(carDetailsDetails.getTopSpeed());
            updatedCarDetails.setLocationCountry(carDetailsDetails.getLocationCountry());
            updatedCarDetails.setLocationCounty(carDetailsDetails.getLocationCounty());
            updatedCarDetails.setImportedFromCountry(carDetailsDetails.getImportedFromCountry());
            updatedCarDetails.setRegisteredInCountry(carDetailsDetails.isRegisteredInCountry());
            updatedCarDetails.setInspectionValidUntil(carDetailsDetails.getInspectionValidUntil());
            updatedCarDetails.setReserved(carDetailsDetails.isReserved());
            updatedCarDetails.setReservationUntilDate(carDetailsDetails.getReservationUntilDate());
            updatedCarDetails.setExchangePossible(carDetailsDetails.isExchangePossible());
            updatedCarDetails.setExchangeDetails(carDetailsDetails.getExchangeDetails());
            updatedCarDetails.setDescription(carDetailsDetails.getDescription());
            return ResponseEntity.ok(carDetailsRepository.save(updatedCarDetails));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarDetails(@PathVariable String id) {
        Optional<CarDetails> carDetails = carDetailsRepository.findById(id);
        if (carDetails.isPresent()) {
            carDetailsRepository.delete(carDetails.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}