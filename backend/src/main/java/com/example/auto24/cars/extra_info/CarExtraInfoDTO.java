package com.example.auto24.cars.extra_info;

import com.example.auto24.cars.extra_info.entity.*;

public record CarExtraInfoDTO(
        SafetyAndSecurity safetyAndSecurity,
        Lights lights,
        TiresAndWheels tiresAndWheels,
        Steering steering,
        Seats seats,
        InteriorFeatures interiorFeatures,
        SportFeatures sportFeatures,
        Comfort comfortFeatures,
        AudioVideoCommunication audioVideoCommunication,
        Additional additional
) {
}