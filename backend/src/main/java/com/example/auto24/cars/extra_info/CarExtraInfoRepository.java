package com.example.auto24.cars.extra_info;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CarExtraInfoRepository extends MongoRepository<CarExtraInfo, String> {
    Optional<CarExtraInfo> findByCarId(String carId);
}