package com.example.auto24.cars;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "car_details")
public class CarDetails {
    @Id
    private String id;
    private String carId;

    private String vehicleType;
    private String bodyType;
    private String bodyTypeDetail;
    private String modelName;
    private String modelGeneration;
    private String modelTrim;
    private String firstRegistrationMonth;
    private String firstRegistrationYear;

    private boolean includesRegistrationFee = false;
    private boolean discountPrice = false;
    private boolean exportPrice = false;
    private int odometerReading;
    private boolean hasServiceBook = false;

    private String vinCode;
    private String registrationNumber;
    private String transmission;
    private String driveType;

    private double engineCapacityLiters;
    private int engineCapacityCubicCentimeters;
    private String engineConfiguration;
    private String engineDetails;
    private int enginePowerKW;
    private int enginePowerHP;

    private double fuelTankCapacity;
    private double fuelConsumptionHighway;
    private double fuelConsumptionCity;
    private double fuelConsumptionCombined;
    private String fuelConsumptionStandard;
    private int co2Emissions;

    private int seatingCapacity;
    private int numberOfDoors;
    private boolean hasWarranty = false;
    private boolean accidentDamaged = false;

    private String color;
    private boolean metallicColor = false;
    private String colorDetail;

    private int curbWeight;
    private int grossWeight;
    private int payloadCapacity;
    private int brakedTrailerWeight;
    private int unbrakedTrailerWeight;
    private int wheelbase;
    private int length;
    private int width;
    private int height;

    private double acceleration0To100;
    private double topSpeed;

    private String locationCountry;
    private String locationCounty;
    private String importedFromCountry;
    private boolean registeredInCountry = false;
    private String inspectionValidUntil;

    private boolean reserved = false;
    private String reservationUntilDate;

    private boolean exchangePossible = false;
    private String exchangeDetails;
    private String description;
}
