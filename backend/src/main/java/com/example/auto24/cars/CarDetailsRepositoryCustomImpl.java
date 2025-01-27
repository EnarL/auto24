package com.example.auto24.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CarDetailsRepositoryCustomImpl implements CarDetailsRepositoryCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<CarDetails> findCarDetailsByCriteria(Map<String, Object> criteria) {
        Query query = new Query();
        criteria.forEach((key, value) -> {
            if (value instanceof List) {
                query.addCriteria(Criteria.where(key).in((List<?>) value));
            } else {
                query.addCriteria(Criteria.where(key).is(value));
            }
        });
        return mongoTemplate.find(query, CarDetails.class);
    }
}