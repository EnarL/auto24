package com.example.auto24.cars;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Getter
@Setter
@Document(collection = "cars")
public class Car {
    @Id
    private String id;
    private String brand;
    private String model;
    private String price;
    private List<String> imageUrls;
    private int year;
    private int mileage;
    private String fuelType;

    private String ownerId;
}