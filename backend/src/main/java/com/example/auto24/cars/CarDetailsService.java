package com.example.auto24.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarDetailsService {

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    @Autowired
    private CarDetailsDTOMapper carDetailsDTOMapper;

    public List<CarDetailsDTO> searchCars(CarDetailsDTO carDetailsDTO) {
        return carDetailsRepository.findAll().stream()
                .filter(carDetails -> (carDetailsDTO.vehicleType() == null || carDetails.getVehicleType().equalsIgnoreCase(carDetailsDTO.vehicleType())) &&
                        (carDetailsDTO.bodyType() == null || carDetails.getBodyType().equalsIgnoreCase(carDetailsDTO.bodyType())) &&
                        (carDetailsDTO.bodyTypeDetail() == null || carDetails.getBodyTypeDetail().equalsIgnoreCase(carDetailsDTO.bodyTypeDetail())) &&
                        (carDetailsDTO.model() == null || carDetails.getModel().equalsIgnoreCase(carDetailsDTO.model())) &&
                        (carDetailsDTO.make() == null || carDetails.getMake().equalsIgnoreCase(carDetailsDTO.make())) &&
                        (carDetailsDTO.modelGeneration() == null || carDetails.getModelGeneration().equalsIgnoreCase(carDetailsDTO.modelGeneration())) &&
                        (carDetailsDTO.modelTrim() == null || carDetails.getModelTrim().equalsIgnoreCase(carDetailsDTO.modelTrim())) &&
                        (carDetailsDTO.firstRegistrationDate() == null || carDetails.getFirstRegistrationDate().equals(carDetailsDTO.firstRegistrationDate())) &&
                        (carDetailsDTO.price() == 0 || carDetails.getPrice() == carDetailsDTO.price()) &&
                        (!carDetailsDTO.includesRegistrationFee() || carDetails.isIncludesRegistrationFee()) &&
                        (!carDetailsDTO.discountPrice() || carDetails.isDiscountPrice()) &&
                        (!carDetailsDTO.exportPrice() || carDetails.isExportPrice()) &&
                        (carDetailsDTO.odometerReading() == 0 || carDetails.getOdometerReading() == carDetailsDTO.odometerReading()) &&
                        (!carDetailsDTO.hasServiceBook() || carDetails.isHasServiceBook()) &&
                        (carDetailsDTO.vinCode() == null || carDetails.getVinCode().equalsIgnoreCase(carDetailsDTO.vinCode())) &&
                        (carDetailsDTO.registrationNumber() == null || carDetails.getRegistrationNumber().equalsIgnoreCase(carDetailsDTO.registrationNumber())) &&
                        (carDetailsDTO.transmission() == null || carDetails.getTransmission().equalsIgnoreCase(carDetailsDTO.transmission())) &&
                        (carDetailsDTO.driveType() == null || carDetails.getDriveType().equalsIgnoreCase(carDetailsDTO.driveType())) &&
                        (carDetailsDTO.engineCapacityLiters() == 0 || carDetails.getEngineCapacityLiters() == carDetailsDTO.engineCapacityLiters()) &&
                        (carDetailsDTO.engineCapacityCubicCentimeters() == 0 || carDetails.getEngineCapacityCubicCentimeters() == carDetailsDTO.engineCapacityCubicCentimeters()) &&
                        (carDetailsDTO.engineConfiguration() == null || carDetails.getEngineConfiguration().equalsIgnoreCase(carDetailsDTO.engineConfiguration())) &&
                        (carDetailsDTO.engineDetails() == null || carDetails.getEngineDetails().equalsIgnoreCase(carDetailsDTO.engineDetails())) &&
                        (carDetailsDTO.enginePowerKW() == 0 || carDetails.getEnginePowerKW() == carDetailsDTO.enginePowerKW()) &&
                        (carDetailsDTO.enginePowerHP() == 0 || carDetails.getEnginePowerHP() == carDetailsDTO.enginePowerHP()) &&
                        (carDetailsDTO.fuelType() == null || carDetails.getFuelType().equalsIgnoreCase(carDetailsDTO.fuelType())) &&
                        (carDetailsDTO.fuelTankCapacity() == 0 || carDetails.getFuelTankCapacity() == carDetailsDTO.fuelTankCapacity()) &&
                        (carDetailsDTO.fuelConsumptionHighway() == 0 || carDetails.getFuelConsumptionHighway() == carDetailsDTO.fuelConsumptionHighway()) &&
                        (carDetailsDTO.fuelConsumptionCity() == 0 || carDetails.getFuelConsumptionCity() == carDetailsDTO.fuelConsumptionCity()) &&
                        (carDetailsDTO.fuelConsumptionCombined() == 0 || carDetails.getFuelConsumptionCombined() == carDetailsDTO.fuelConsumptionCombined()) &&
                        (carDetailsDTO.fuelConsumptionStandard() == null || carDetails.getFuelConsumptionStandard().equalsIgnoreCase(carDetailsDTO.fuelConsumptionStandard())) &&
                        (carDetailsDTO.co2Emissions() == 0 || carDetails.getCo2Emissions() == carDetailsDTO.co2Emissions()) &&
                        (carDetailsDTO.seatingCapacity() == 0 || carDetails.getSeatingCapacity() == carDetailsDTO.seatingCapacity()) &&
                        (carDetailsDTO.numberOfDoors() == 0 || carDetails.getNumberOfDoors() == carDetailsDTO.numberOfDoors()) &&
                        (!carDetailsDTO.hasWarranty() || carDetails.isHasWarranty()) &&
                        (!carDetailsDTO.accidentDamaged() || carDetails.isAccidentDamaged()) &&
                        (carDetailsDTO.color() == null || carDetails.getColor().equalsIgnoreCase(carDetailsDTO.color())) &&
                        (!carDetailsDTO.metallicColor() || carDetails.isMetallicColor()) &&
                        (carDetailsDTO.colorDetail() == null || carDetails.getColorDetail().equalsIgnoreCase(carDetailsDTO.colorDetail())) &&
                        (carDetailsDTO.curbWeight() == 0 || carDetails.getCurbWeight() == carDetailsDTO.curbWeight()) &&
                        (carDetailsDTO.grossWeight() == 0 || carDetails.getGrossWeight() == carDetailsDTO.grossWeight()) &&
                        (carDetailsDTO.payloadCapacity() == 0 || carDetails.getPayloadCapacity() == carDetailsDTO.payloadCapacity()) &&
                        (carDetailsDTO.brakedTrailerWeight() == 0 || carDetails.getBrakedTrailerWeight() == carDetailsDTO.brakedTrailerWeight()) &&
                        (carDetailsDTO.unbrakedTrailerWeight() == 0 || carDetails.getUnbrakedTrailerWeight() == carDetailsDTO.unbrakedTrailerWeight()) &&
                        (carDetailsDTO.wheelbase() == 0 || carDetails.getWheelbase() == carDetailsDTO.wheelbase()) &&
                        (carDetailsDTO.length() == 0 || carDetails.getLength() == carDetailsDTO.length()) &&
                        (carDetailsDTO.width() == 0 || carDetails.getWidth() == carDetailsDTO.width()) &&
                        (carDetailsDTO.height() == 0 || carDetails.getHeight() == carDetailsDTO.height()) &&
                        (carDetailsDTO.acceleration0To100() == 0 || carDetails.getAcceleration0To100() == carDetailsDTO.acceleration0To100()) &&
                        (carDetailsDTO.topSpeed() == 0 || carDetails.getTopSpeed() == carDetailsDTO.topSpeed()) &&
                        (carDetailsDTO.locationCountry() == null || carDetails.getLocationCountry().equalsIgnoreCase(carDetailsDTO.locationCountry())) &&
                        (carDetailsDTO.locationCounty() == null || carDetails.getLocationCounty().equalsIgnoreCase(carDetailsDTO.locationCounty())) &&
                        (carDetailsDTO.importedFromCountry() == null || carDetails.getImportedFromCountry().equalsIgnoreCase(carDetailsDTO.importedFromCountry())) &&
                        (!carDetailsDTO.registeredInCountry() || carDetails.isRegisteredInCountry()) &&
                        (carDetailsDTO.inspectionValidUntil() == null || carDetails.getInspectionValidUntil().equals(carDetailsDTO.inspectionValidUntil())) &&
                        (!carDetailsDTO.reserved() || carDetails.isReserved()) &&
                        (carDetailsDTO.reservationUntilDate() == null || carDetails.getReservationUntilDate().equals(carDetailsDTO.reservationUntilDate())) &&
                        (!carDetailsDTO.exchangePossible() || carDetails.isExchangePossible()) &&
                        (carDetailsDTO.exchangeDetails() == null || carDetails.getExchangeDetails().equalsIgnoreCase(carDetailsDTO.exchangeDetails())) &&
                        (carDetailsDTO.description() == null || carDetails.getDescription().equalsIgnoreCase(carDetailsDTO.description())))
                .map(carDetailsDTOMapper)
                .collect(Collectors.toList());
    }
    public void createAndSaveCarDetails(String carId, CarDetailsDTO carDetailsDTO) {
        CarDetails carDetails = new CarDetails();
        carDetails.setCarId(carId);
        carDetails.setVehicleType(carDetailsDTO.vehicleType());
        carDetails.setBodyType(carDetailsDTO.bodyType());
        carDetails.setBodyTypeDetail(carDetailsDTO.bodyTypeDetail());
        carDetails.setModel(carDetailsDTO.model());
        carDetails.setMake(carDetailsDTO.make());
        carDetails.setModelGeneration(carDetailsDTO.modelGeneration());
        carDetails.setModelTrim(carDetailsDTO.modelTrim());
        carDetails.setFirstRegistrationDate(carDetailsDTO.firstRegistrationDate());
        carDetails.setPrice(carDetailsDTO.price());
        carDetails.setIncludesRegistrationFee(carDetailsDTO.includesRegistrationFee());
        carDetails.setDiscountPrice(carDetailsDTO.discountPrice());
        carDetails.setExportPrice(carDetailsDTO.exportPrice());
        carDetails.setOdometerReading(carDetailsDTO.odometerReading());
        carDetails.setHasServiceBook(carDetailsDTO.hasServiceBook());
        carDetails.setVinCode(carDetailsDTO.vinCode());
        carDetails.setRegistrationNumber(carDetailsDTO.registrationNumber());
        carDetails.setTransmission(carDetailsDTO.transmission());
        carDetails.setDriveType(carDetailsDTO.driveType());
        carDetails.setEngineCapacityLiters(carDetailsDTO.engineCapacityLiters());
        carDetails.setEngineCapacityCubicCentimeters(carDetailsDTO.engineCapacityCubicCentimeters());
        carDetails.setEngineConfiguration(carDetailsDTO.engineConfiguration());
        carDetails.setEngineDetails(carDetailsDTO.engineDetails());
        carDetails.setEnginePowerKW(carDetailsDTO.enginePowerKW());
        carDetails.setEnginePowerHP(carDetailsDTO.enginePowerHP());
        carDetails.setFuelType(carDetailsDTO.fuelType());
        carDetails.setFuelTankCapacity(carDetailsDTO.fuelTankCapacity());
        carDetails.setFuelConsumptionHighway(carDetailsDTO.fuelConsumptionHighway());
        carDetails.setFuelConsumptionCity(carDetailsDTO.fuelConsumptionCity());
        carDetails.setFuelConsumptionCombined(carDetailsDTO.fuelConsumptionCombined());
        carDetails.setFuelConsumptionStandard(carDetailsDTO.fuelConsumptionStandard());
        carDetails.setCo2Emissions(carDetailsDTO.co2Emissions());
        carDetails.setSeatingCapacity(carDetailsDTO.seatingCapacity());
        carDetails.setNumberOfDoors(carDetailsDTO.numberOfDoors());
        carDetails.setHasWarranty(carDetailsDTO.hasWarranty());
        carDetails.setAccidentDamaged(carDetailsDTO.accidentDamaged());
        carDetails.setColor(carDetailsDTO.color());
        carDetails.setMetallicColor(carDetailsDTO.metallicColor());
        carDetails.setColorDetail(carDetailsDTO.colorDetail());
        carDetails.setCurbWeight(carDetailsDTO.curbWeight());
        carDetails.setGrossWeight(carDetailsDTO.grossWeight());
        carDetails.setPayloadCapacity(carDetailsDTO.payloadCapacity());
        carDetails.setBrakedTrailerWeight(carDetailsDTO.brakedTrailerWeight());
        carDetails.setUnbrakedTrailerWeight(carDetailsDTO.unbrakedTrailerWeight());
        carDetails.setWheelbase(carDetailsDTO.wheelbase());
        carDetails.setLength(carDetailsDTO.length());
        carDetails.setWidth(carDetailsDTO.width());
        carDetails.setHeight(carDetailsDTO.height());
        carDetails.setAcceleration0To100(carDetailsDTO.acceleration0To100());
        carDetails.setTopSpeed(carDetailsDTO.topSpeed());
        carDetails.setLocationCountry(carDetailsDTO.locationCountry());
        carDetails.setLocationCounty(carDetailsDTO.locationCounty());
        carDetails.setImportedFromCountry(carDetailsDTO.importedFromCountry());
        carDetails.setRegisteredInCountry(carDetailsDTO.registeredInCountry());
        carDetails.setInspectionValidUntil(carDetailsDTO.inspectionValidUntil());
        carDetails.setReserved(carDetailsDTO.reserved());
        carDetails.setReservationUntilDate(carDetailsDTO.reservationUntilDate());
        carDetails.setExchangePossible(carDetailsDTO.exchangePossible());
        carDetails.setExchangeDetails(carDetailsDTO.exchangeDetails());
        carDetails.setDescription(carDetailsDTO.description());

        carDetailsRepository.save(carDetails);
    }
    public List<CarDetails> getAllCarDetails() {
        return carDetailsRepository.findAll();
    }

    public Optional<CarDetails> getCarDetailsById(String id) {
        return carDetailsRepository.findById(id);
    }

    public CarDetails createCarDetails(CarDetails carDetails) {
        return carDetailsRepository.save(carDetails);
    }

    public Optional<CarDetails> updateCarDetails(String id, CarDetails carDetailsDetails) {
        return carDetailsRepository.findById(id).map(carDetails -> {
            carDetails.setCarId(carDetailsDetails.getCarId());
            carDetails.setVehicleType(carDetailsDetails.getVehicleType());
            carDetails.setBodyType(carDetailsDetails.getBodyType());
            carDetails.setBodyTypeDetail(carDetailsDetails.getBodyTypeDetail());
            carDetails.setModel(carDetailsDetails.getModel());
            carDetails.setMake(carDetailsDetails.getMake());
            carDetails.setModelGeneration(carDetailsDetails.getModelGeneration());
            carDetails.setModelTrim(carDetailsDetails.getModelTrim());
            carDetails.setPrice(carDetailsDetails.getPrice());
            carDetails.setFirstRegistrationDate(carDetailsDetails.getFirstRegistrationDate());
            carDetails.setIncludesRegistrationFee(carDetailsDetails.isIncludesRegistrationFee());
            carDetails.setDiscountPrice(carDetailsDetails.isDiscountPrice());
            carDetails.setExportPrice(carDetailsDetails.isExportPrice());
            carDetails.setOdometerReading(carDetailsDetails.getOdometerReading());
            carDetails.setHasServiceBook(carDetailsDetails.isHasServiceBook());
            carDetails.setVinCode(carDetailsDetails.getVinCode());
            carDetails.setRegistrationNumber(carDetailsDetails.getRegistrationNumber());
            carDetails.setTransmission(carDetailsDetails.getTransmission());
            carDetails.setDriveType(carDetailsDetails.getDriveType());
            carDetails.setEngineCapacityLiters(carDetailsDetails.getEngineCapacityLiters());
            carDetails.setEngineCapacityCubicCentimeters(carDetailsDetails.getEngineCapacityCubicCentimeters());
            carDetails.setEngineConfiguration(carDetailsDetails.getEngineConfiguration());
            carDetails.setEngineDetails(carDetailsDetails.getEngineDetails());
            carDetails.setEnginePowerKW(carDetailsDetails.getEnginePowerKW());
            carDetails.setEnginePowerHP(carDetailsDetails.getEnginePowerHP());
            carDetails.setFuelType(carDetailsDetails.getFuelType());
            carDetails.setFuelTankCapacity(carDetailsDetails.getFuelTankCapacity());
            carDetails.setFuelConsumptionHighway(carDetailsDetails.getFuelConsumptionHighway());
            carDetails.setFuelConsumptionCity(carDetailsDetails.getFuelConsumptionCity());
            carDetails.setFuelConsumptionCombined(carDetailsDetails.getFuelConsumptionCombined());
            carDetails.setFuelConsumptionStandard(carDetailsDetails.getFuelConsumptionStandard());
            carDetails.setCo2Emissions(carDetailsDetails.getCo2Emissions());
            carDetails.setSeatingCapacity(carDetailsDetails.getSeatingCapacity());
            carDetails.setNumberOfDoors(carDetailsDetails.getNumberOfDoors());
            carDetails.setHasWarranty(carDetailsDetails.isHasWarranty());
            carDetails.setAccidentDamaged(carDetailsDetails.isAccidentDamaged());
            carDetails.setColor(carDetailsDetails.getColor());
            carDetails.setMetallicColor(carDetailsDetails.isMetallicColor());
            carDetails.setColorDetail(carDetailsDetails.getColorDetail());
            carDetails.setCurbWeight(carDetailsDetails.getCurbWeight());
            carDetails.setGrossWeight(carDetailsDetails.getGrossWeight());
            carDetails.setPayloadCapacity(carDetailsDetails.getPayloadCapacity());
            carDetails.setBrakedTrailerWeight(carDetailsDetails.getBrakedTrailerWeight());
            carDetails.setUnbrakedTrailerWeight(carDetailsDetails.getUnbrakedTrailerWeight());
            carDetails.setWheelbase(carDetailsDetails.getWheelbase());
            carDetails.setLength(carDetailsDetails.getLength());
            carDetails.setWidth(carDetailsDetails.getWidth());
            carDetails.setHeight(carDetailsDetails.getHeight());
            carDetails.setAcceleration0To100(carDetailsDetails.getAcceleration0To100());
            carDetails.setTopSpeed(carDetailsDetails.getTopSpeed());
            carDetails.setLocationCountry(carDetailsDetails.getLocationCountry());
            carDetails.setLocationCounty(carDetailsDetails.getLocationCounty());
            carDetails.setImportedFromCountry(carDetailsDetails.getImportedFromCountry());
            carDetails.setRegisteredInCountry(carDetailsDetails.isRegisteredInCountry());
            carDetails.setInspectionValidUntil(carDetailsDetails.getInspectionValidUntil());
            carDetails.setReserved(carDetailsDetails.isReserved());
            carDetails.setReservationUntilDate(carDetailsDetails.getReservationUntilDate());
            carDetails.setExchangePossible(carDetailsDetails.isExchangePossible());
            carDetails.setExchangeDetails(carDetailsDetails.getExchangeDetails());
            carDetails.setDescription(carDetailsDetails.getDescription());
            return carDetailsRepository.save(carDetails);
        });
    }

    public void deleteCarDetails(String id) {
        carDetailsRepository.findById(id).ifPresent(carDetailsRepository::delete);
    }

}