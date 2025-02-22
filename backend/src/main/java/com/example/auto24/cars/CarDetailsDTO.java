package com.example.auto24.cars;


public record CarDetailsDTO(
        String id,
        String vehicleType,
        String bodyType,
        String bodyTypeDetail,
        String model,
        String make,
        String modelGeneration,
        String modelTrim,
        String firstRegistrationDate,
        double price,
        boolean includesRegistrationFee,
        boolean discountPrice,
        boolean exportPrice,
        int odometerReading,
        boolean hasServiceBook,
        String vinCode,
        String registrationNumber,
        String transmission,
        String driveType,
        double engineCapacityLiters,
        int engineCapacityCubicCentimeters,
        String engineConfiguration,
        String engineDetails,
        int enginePowerKW,
        int enginePowerHP,
        String fuelType,
        double fuelTankCapacity,
        double fuelConsumptionHighway,
        double fuelConsumptionCity,
        double fuelConsumptionCombined,
        String fuelConsumptionStandard,
        int co2Emissions,
        int seatingCapacity,
        int numberOfDoors,
        boolean hasWarranty,
        boolean accidentDamaged,
        String color,
        boolean metallicColor,
        String colorDetail,
        int curbWeight,
        int grossWeight,
        int payloadCapacity,
        int brakedTrailerWeight,
        int unbrakedTrailerWeight,
        int wheelbase,
        int length,
        int width,
        int height,
        double acceleration0To100,
        double topSpeed,
        String locationCountry,
        String locationCounty,
        String importedFromCountry,
        boolean registeredInCountry,
        String inspectionValidUntil,
        boolean reserved,
        String reservationUntilDate,
        boolean exchangePossible,
        String exchangeDetails,
        String description
) {
}