package com.example.auto24.cars;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CarRepository extends MongoRepository<Car, String> {
    List<Car> findByOwnerId(String ownerId);
}