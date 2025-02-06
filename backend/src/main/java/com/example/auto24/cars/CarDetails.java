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

    // Basic Information
    private String vehicleType;            // e.g., Sedan, SUV
    private String bodyType;               // e.g., Hatchback, Coupe
    private String bodyTypeDetail;         // Additional body details if any
    private String model;                  // e.g., BMW
    private String make;              // e.g., 3 Series
    private String modelGeneration;        // e.g., F30
    private String modelTrim;              // e.g., Sport, Luxury
    private String firstRegistrationDate;  // First registration date (e.g., 2017-06-15)

    // Pricing
    private double price;                     // Car price in currency units (e.g., 25000)
    private boolean includesRegistrationFee = false; // Does the price include registration fee?
    private boolean discountPrice = false;        // Is there a discount applied?
    private boolean exportPrice = false;          // Is the price for export?

    // Odometer & Documentation
    private int odometerReading;               // Odometer reading in kilometers
    private boolean hasServiceBook = false;     // Does the car have a service book?
    private String vinCode;                    // Vehicle Identification Number
    private String registrationNumber;         // Vehicle registration number
    private String transmission;               // Transmission type (e.g., Manual, Automatic)
    private String driveType;                  // e.g., Front-Wheel Drive, All-Wheel Drive

    // Engine & Performance
    private double engineCapacityLiters;           // Engine capacity in Liters (e.g., 2.0)
    private int engineCapacityCubicCentimeters;    // Engine capacity in Cubic Centimeters (e.g., 2000)
    private String engineConfiguration;           // Engine configuration (e.g., Inline 4)
    private String engineDetails;                 // Detailed engine specs (e.g., turbocharged, hybrid)
    private int enginePowerKW;                    // Engine power in kW
    private int enginePowerHP;                    // Engine power in horsepower (HP)

    // Fuel & Efficiency
    private String fuelType;                      // Fuel type (e.g., Petrol, Diesel, Electric)
    private double fuelTankCapacity;              // Fuel tank capacity in Liters
    private double fuelConsumptionHighway;        // Fuel consumption on highway (L/100 km)
    private double fuelConsumptionCity;           // Fuel consumption in the city (L/100 km)
    private double fuelConsumptionCombined;       // Combined fuel consumption (L/100 km)
    private String fuelConsumptionStandard;       // Standard fuel consumption measure (e.g., EU, EPA)
    private int co2Emissions;                     // CO2 emissions in grams per kilometer

    // Dimensions & Weight
    private int seatingCapacity;                  // Number of seats
    private int numberOfDoors;                    // Number of doors
    private boolean hasWarranty = false;          // Does the car have warranty?
    private boolean accidentDamaged = false;      // Was the car involved in an accident?

    // Color & Features
    private String color;                         // Color of the car
    private boolean metallicColor = false;        // Is the car color metallic?
    private String colorDetail;                   // Additional color details (e.g., metallic silver)

    // Physical Characteristics
    private int curbWeight;                       // Weight of the car without passengers (in kg)
    private int grossWeight;                      // Gross vehicle weight (in kg)
    private int payloadCapacity;                  // Payload capacity (in kg)
    private int brakedTrailerWeight;              // Braked trailer weight (in kg)
    private int unbrakedTrailerWeight;            // Unbraked trailer weight (in kg)
    private int wheelbase;                        // Distance between front and rear axles (in cm)
    private int length;                           // Length of the car (in cm)
    private int width;                            // Width of the car (in cm)
    private int height;                           // Height of the car (in cm)

    // Performance Metrics
    private double acceleration0To100;            // Time to accelerate from 0 to 100 km/h (in seconds)
    private double topSpeed;                      // Top speed (in km/h)

    // Location & Registration Info
    private String locationCountry;               // Country where the car is located
    private String locationCounty;                // County or region within the country
    private String importedFromCountry;           // Country where the car was imported from
    private boolean registeredInCountry = false;  // Is the car registered in the current country?
    private String inspectionValidUntil;          // Date until which the car's inspection is valid

    // Additional Information
    private boolean reserved = false;             // Is the car reserved?
    private String reservationUntilDate;          // Date until the car is reserved
    private boolean exchangePossible = false;     // Is the car available for exchange?
    private String exchangeDetails;               // Details about possible exchange options
    private String description;                   // A detailed description of the car

}
