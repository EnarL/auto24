package com.example.auto24.cars;

import java.util.List;
import java.util.Map;

public interface CarDetailsRepositoryCustom {
    List<CarDetails> findCarDetailsByCriteria(Map<String, Object> criteria);
}
