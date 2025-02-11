package com.example.auto24.cars;

import java.util.function.Predicate;

public class CarDetailsFilter {

    public static Predicate<CarDetails> buildFilter(CarDetailsDTO carDetailsDTO) {
        return carDetails ->
                (carDetailsDTO.vehicleType() == null || carDetails.getVehicleType().equalsIgnoreCase(carDetailsDTO.vehicleType())) &&
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
                        (carDetailsDTO.description() == null || carDetails.getDescription().equalsIgnoreCase(carDetailsDTO.description()));
    }
}
