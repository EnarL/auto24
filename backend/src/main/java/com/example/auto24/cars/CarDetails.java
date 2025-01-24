package com.example.auto24.cars;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
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
    private boolean includesRegistrationFee;
    private boolean discountPrice;
    private boolean exportPrice;
    private int odometerReading;
    private boolean hasServiceBook;
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
    private boolean hasWarranty;
    private boolean isAccidentDamaged;
    private String color;
    private boolean isMetallicColor;
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
    private boolean registeredInCountry;
    private String inspectionValidUntil;
    private boolean isReserved;
    private String reservationUntilDate;
    private boolean exchangePossible;
    private String exchangeDetails;
    private String description;
}