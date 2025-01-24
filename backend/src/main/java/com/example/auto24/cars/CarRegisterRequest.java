package com.example.auto24.cars;

public record CarRegisterRequest(
        String brand,
        String model,
        String price,
        int year,
        int mileage,
        String fuelType
) {

}
