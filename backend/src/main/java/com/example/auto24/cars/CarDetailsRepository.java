package com.example.auto24.cars;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarDetailsRepository extends MongoRepository<CarDetails, String> {

}
