package com.example.auto24.cars.extra_info;

import java.util.function.Function;

public class CarExtraInfoDTOMapper implements Function<CarExtraInfo, CarExtraInfoDTO> {
    @Override
    public CarExtraInfoDTO apply(CarExtraInfo carExtraInfo) {
        return new CarExtraInfoDTO(
                carExtraInfo.getSafetyAndSecurity(),
                carExtraInfo.getLights(),
                carExtraInfo.getTiresAndWheels(),
                carExtraInfo.getSteering(),
                carExtraInfo.getSeats(),
                carExtraInfo.getInteriorFeatures(),
                carExtraInfo.getSportFeatures(),
                carExtraInfo.getComfortFeatures(),
                carExtraInfo.getAudioVideoCommunication(),
                carExtraInfo.getAdditional()
        );
    }
}