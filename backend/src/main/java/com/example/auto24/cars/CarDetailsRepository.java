package com.example.auto24.cars;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CarDetailsRepository extends MongoRepository<CarDetails, String> {

    @Query("{ 'price': { $gte: ?0, $lte: ?1 } }")
    List<CarDetails> findByPriceBetween(double minPrice, double maxPrice);
}