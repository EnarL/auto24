package com.example.auto24.cars;

public record CarDTO(
        String brand,
        String model,
        String price,
        int year,
        int mileage
) { }