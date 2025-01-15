package com.example.auto24.cars;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cars")
@Data
@Getter
@Setter
@ToString
public class Car {
    @Id
    private String id;
    private String brand;
    private String model;
    private String price;
    private String imageUrl;
    private int year;
    private int mileage;
    private String fuelType;
}