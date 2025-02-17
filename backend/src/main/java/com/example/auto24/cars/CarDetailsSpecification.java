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
                    case "id", "vehicleType", "bodyType", "bodyTypeDetail", "model", "make",
                         "modelGeneration", "modelTrim", "firstRegistrationDate",
                         "vinCode", "registrationNumber", "transmission", "driveType",
                         "engineConfiguration", "engineDetails", "fuelType", "color",
                         "colorDetail", "locationCountry", "locationCounty", "importedFromCountry",
                         "inspectionValidUntil", "reservationUntilDate", "exchangeDetails" ->
                            query.addCriteria(Criteria.where(key).is(value));

                    case "price", "odometerReading", "enginePowerKW", "enginePowerHP",
                         "fuelTankCapacity", "fuelConsumptionHighway", "fuelConsumptionCity",
                         "fuelConsumptionCombined", "co2Emissions", "seatingCapacity",
                         "numberOfDoors", "curbWeight", "grossWeight", "payloadCapacity",
                         "brakedTrailerWeight", "unbrakedTrailerWeight", "wheelbase",
                         "length", "width", "height", "acceleration0To100", "topSpeed" -> {
                        if (value.contains("-")) {
                            String[] range = value.split("-");
                            double min = Double.parseDouble(range[0]);
                            double max = Double.parseDouble(range[1]);
                            query.addCriteria(Criteria.where(key).gte(min).lte(max));
                        } else {
                            query.addCriteria(Criteria.where(key).lte(Double.parseDouble(value)));
                        }
                    }
                    case "includesRegistrationFee", "discountPrice", "exportPrice",
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