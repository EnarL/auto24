package com.example.auto24.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CarDetailsService {

    @Autowired
    private CarDetailsRepository carDetailsRepository;

    public List<CarDetails> searchCarDetails(Map<String, Object> criteria) {
        return carDetailsRepository.findCarDetailsByCriteria(criteria);
    }
}