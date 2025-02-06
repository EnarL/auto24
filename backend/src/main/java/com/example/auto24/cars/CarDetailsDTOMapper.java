package com.example.auto24.cars;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CarDetailsDTOMapper implements Function<CarDetails, CarDetailsDTO> {
    @Override
    public CarDetailsDTO apply(CarDetails carDetails) {
        return new CarDetailsDTO(
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
                carDetails.isDiscountPrice(),
                carDetails.isExportPrice(),
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
}