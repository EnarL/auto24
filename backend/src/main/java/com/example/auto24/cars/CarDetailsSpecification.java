package com.example.auto24.cars;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class CarDetailsSpecification {

    public static Query buildQuery(Map<String, String> searchParams) {
        Query query = new Query();

        searchParams.forEach((key, value) -> {
            if (value != null && !value.isEmpty()) {
                switch (key) {
                    case "vehicleType", "bodyType", "bodyTypeDetail", "model", "make",
                         "modelGeneration", "modelTrim", "vinCode", "registrationNumber", "transmission", "driveType",
                         "engineConfiguration", "engineDetails", "fuelType", "color",
                         "colorDetail", "locationCountry", "locationCounty", "importedFromCountry",
                         "inspectionValidUntil", "reservationUntilDate", "exchangeDetails" ->
                            query.addCriteria(Criteria.where(key).is(value));

                    case "price", "odometerReading", "enginePowerKW", "enginePowerHP",
                         "fuelTankCapacity", "fuelConsumptionHighway", "fuelConsumptionCity",
                         "fuelConsumptionCombined", "co2Emissions", "seatingCapacity",
                         "numberOfDoors", "curbWeight", "grossWeight", "payloadCapacity",
                         "brakedTrailerWeight", "unbrakedTrailerWeight", "wheelbase",
                         "length", "width", "height", "numberOfAxles", "acceleration0To100", "topSpeed" -> {
                        if (value.contains("-")) {
                            String[] range = value.split("-");
                            double min = Double.parseDouble(range[0]);
                            double max = Double.parseDouble(range[1]);
                            query.addCriteria(Criteria.where(key).gte(min).lte(max));
                        } else {
                            query.addCriteria(Criteria.where(key).lte(Double.parseDouble(value)));
                        }
                    }
                    case "firstRegistrationDate" -> {
                        if (value.contains("-")) {
                            String[] range = value.split("-");
                            int minYear = Integer.parseInt(range[0]);
                            int maxYear = Integer.parseInt(range[1]);
                            query.addCriteria(Criteria.where(key).gte(minYear + "-01-01").lte(maxYear + "-12-31"));
                        } else {
                            int year = Integer.parseInt(value);
                            query.addCriteria(Criteria.where(key).gte(year + "-01-01").lte(year + "-12-31"));
                        }
                    }
                    case "includesRegistrationFee",
                         "hasServiceBook", "hasWarranty", "accidentDamaged",
                         "metallicColor", "registeredInCountry", "reserved", "exchangePossible" ->
                            query.addCriteria(Criteria.where(key).is(Boolean.parseBoolean(value)));
                    case "description" ->
                            query.addCriteria(Criteria.where("description").regex(".*" + value + ".*", "i"));
                }
            }
        });

        return query;
    }
}