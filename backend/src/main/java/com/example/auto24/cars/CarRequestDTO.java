package com.example.auto24.cars;

import lombok.Data;

@Data
public class CarRequestDTO {
    private String userId;
    private String brand;
    private String model;
    private String price;
    private String imageUrl;
    private int year;
    private int mileage;
    private String fuelType;
}