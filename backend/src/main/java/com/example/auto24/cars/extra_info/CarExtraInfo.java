package com.example.auto24.cars.extra_info;

import com.example.auto24.cars.extra_info.entity.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@Document(collection = "car_extra_info")
public class CarExtraInfo {
    @Id
    private String id;
    private String carId;
    private SafetyAndSecurity safetyAndSecurity;
    private Lights lights;
    private TiresAndWheels tiresAndWheels;
    private Steering steering;
    private Seats seats;
    private InteriorFeatures interiorFeatures;
    private SportFeatures sportFeatures;
    private Comfort comfortFeatures;
    private AudioVideoCommunication audioVideoCommunication;
    private Additional additional;
}