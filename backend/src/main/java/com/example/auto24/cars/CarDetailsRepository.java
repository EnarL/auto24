package com.example.auto24.cars;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Map;

public interface CarDetailsRepository extends MongoRepository<CarDetails, String> {
    List<CarDetails> findCarDetailsByCriteria(Map<String, Object> criteria);
}
