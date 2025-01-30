package com.example.auto24.cars;

import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
public class CarDTOMapper implements Function<Car,CarDTO> {
    @Override
    public CarDTO apply(Car car) {
        return new CarDTO(
                car.getImageKeys(),
                car.getOwnerId(),
                car.getCreatedAt(),
                car.getExpirationDate()
        );
}}
