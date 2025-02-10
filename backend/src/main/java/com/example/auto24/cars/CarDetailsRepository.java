package com.example.auto24.cars;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CarDetailsRepository extends MongoRepository<CarDetails, String> {
    Optional<CarDetails> findByCarId(String id);
}