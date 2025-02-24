package com.example.auto24.cars;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CarDetailsDTOMapper implements Function<CarDetails, CarDetailsDTO> {
    @Override
    public CarDetailsDTO apply(CarDetails carDetails) {
        return new CarDetailsDTO(
                carDetails.getCarId(),
                carDetails.getVehicleType(),
                carDetails.getBodyType(),
                carDetails.getBodyTypeDetail(),
                carDetails.getModel(),
                carDetails.getMake(),
                carDetails.getModelGeneration(),
                carDetails.getModelTrim(),
                carDetails.getFirstRegistrationDate(),
                carDetails.getPrice(),
                carDetails.isIncludesRegistrationFee(),
                carDetails.getOdometerReading(),
                carDetails.isHasServiceBook(),
                carDetails.getVinCode(),
                carDetails.getRegistrationNumber(),
                carDetails.getTransmission(),
                carDetails.getDriveType(),
                carDetails.getEngineCapacityLiters(),
                carDetails.getEngineCapacityCubicCentimeters(),
                carDetails.getEngineConfiguration(),
                carDetails.getEngineDetails(),
                carDetails.getEnginePowerKW(),
                carDetails.getEnginePowerHP(),
                carDetails.getFuelType(),
                carDetails.getFuelTankCapacity(),
                carDetails.getFuelConsumptionHighway(),
                carDetails.getFuelConsumptionCity(),
                carDetails.getFuelConsumptionCombined(),
                carDetails.getFuelConsumptionStandard(),
                carDetails.getCo2Emissions(),
                carDetails.getSeatingCapacity(),
                carDetails.getNumberOfDoors(),
                carDetails.isHasWarranty(),
                carDetails.isAccidentDamaged(),
                carDetails.getColor(),
                carDetails.isMetallicColor(),
                carDetails.getColorDetail(),
                carDetails.getCurbWeight(),
                carDetails.getGrossWeight(),
                carDetails.getPayloadCapacity(),
                carDetails.getBrakedTrailerWeight(),
                carDetails.getUnbrakedTrailerWeight(),
                carDetails.getWheelbase(),
                carDetails.getLength(),
                carDetails.getWidth(),
                carDetails.getHeight(),
                carDetails.getNumberOfAxles(),
                carDetails.getAcceleration0To100(),
                carDetails.getTopSpeed(),
                carDetails.getLocationCountry(),
                carDetails.getLocationCounty(),
                carDetails.getImportedFromCountry(),
                carDetails.isRegisteredInCountry(),
                carDetails.getInspectionValidUntil(),
                carDetails.isReserved(),
                carDetails.getReservationUntilDate(),
                carDetails.isExchangePossible(),
                carDetails.getExchangeDetails(),
                carDetails.getDescription()
        );
    }
    public CarDetails toEntity(CarDetailsDTO dto, String carId) {
        CarDetails carDetails = new CarDetails();
        carDetails.setCarId(carId);
        carDetails.setVehicleType(dto.vehicleType());
        carDetails.setBodyType(dto.bodyType());
        carDetails.setBodyTypeDetail(dto.bodyTypeDetail());
        carDetails.setModel(dto.model());
        carDetails.setMake(dto.make());
        carDetails.setModelGeneration(dto.modelGeneration());
        carDetails.setModelTrim(dto.modelTrim());
        carDetails.setFirstRegistrationDate(dto.firstRegistrationDate());
        carDetails.setPrice(dto.price());
        carDetails.setIncludesRegistrationFee(dto.includesRegistrationFee());
        carDetails.setOdometerReading(dto.odometerReading());
        carDetails.setHasServiceBook(dto.hasServiceBook());
        carDetails.setVinCode(dto.vinCode());
        carDetails.setRegistrationNumber(dto.registrationNumber());
        carDetails.setTransmission(dto.transmission());
        carDetails.setDriveType(dto.driveType());
        carDetails.setEngineCapacityLiters(dto.engineCapacityLiters());
        carDetails.setEngineCapacityCubicCentimeters(dto.engineCapacityCubicCentimeters());
        carDetails.setEngineConfiguration(dto.engineConfiguration());
        carDetails.setEngineDetails(dto.engineDetails());
        carDetails.setEnginePowerKW(dto.enginePowerKW());
        carDetails.setEnginePowerHP(dto.enginePowerHP());
        carDetails.setFuelType(dto.fuelType());
        carDetails.setFuelTankCapacity(dto.fuelTankCapacity());
        carDetails.setFuelConsumptionHighway(dto.fuelConsumptionHighway());
        carDetails.setFuelConsumptionCity(dto.fuelConsumptionCity());
        carDetails.setFuelConsumptionCombined(dto.fuelConsumptionCombined());
        carDetails.setFuelConsumptionStandard(dto.fuelConsumptionStandard());
        carDetails.setCo2Emissions(dto.co2Emissions());
        carDetails.setSeatingCapacity(dto.seatingCapacity());
        carDetails.setNumberOfDoors(dto.numberOfDoors());
        carDetails.setHasWarranty(dto.hasWarranty());
        carDetails.setAccidentDamaged(dto.accidentDamaged());
        carDetails.setColor(dto.color());
        carDetails.setMetallicColor(dto.metallicColor());
        carDetails.setColorDetail(dto.colorDetail());
        carDetails.setCurbWeight(dto.curbWeight());
        carDetails.setGrossWeight(dto.grossWeight());
        carDetails.setPayloadCapacity(dto.payloadCapacity());
        carDetails.setBrakedTrailerWeight(dto.brakedTrailerWeight());
        carDetails.setUnbrakedTrailerWeight(dto.unbrakedTrailerWeight());
        carDetails.setWheelbase(dto.wheelbase());
        carDetails.setLength(dto.length());
        carDetails.setWidth(dto.width());
        carDetails.setHeight(dto.height());
        carDetails.setNumberOfAxles(dto.numberOfAxles());
        carDetails.setAcceleration0To100(dto.acceleration0To100());
        carDetails.setTopSpeed(dto.topSpeed());
        carDetails.setLocationCountry(dto.locationCountry());
        carDetails.setLocationCounty(dto.locationCounty());
        carDetails.setImportedFromCountry(dto.importedFromCountry());
        carDetails.setRegisteredInCountry(dto.registeredInCountry());
        carDetails.setInspectionValidUntil(dto.inspectionValidUntil());
        carDetails.setReserved(dto.reserved());
        carDetails.setReservationUntilDate(dto.reservationUntilDate());
        carDetails.setExchangePossible(dto.exchangePossible());
        carDetails.setExchangeDetails(dto.exchangeDetails());
        carDetails.setDescription(dto.description());

        return carDetails;
    }

}