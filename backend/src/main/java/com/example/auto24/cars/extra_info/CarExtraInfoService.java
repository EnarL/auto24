package com.example.auto24.cars.extra_info;

import org.springframework.stereotype.Service;

@Service
public class CarExtraInfoService {

    private final CarExtraInfoRepository carExtraInfoRepository;

    public CarExtraInfoService(CarExtraInfoRepository carExtraInfoRepository) {
        this.carExtraInfoRepository = carExtraInfoRepository;
    }

    public void createAndSaveCarExtraInfo(String carId, CarExtraInfoDTO carExtraInfoDTO) {
        CarExtraInfo carExtraInfo = new CarExtraInfo();
        carExtraInfo.setCarId(carId);
        carExtraInfo.setSafetyAndSecurity(carExtraInfoDTO.safetyAndSecurity());
        carExtraInfo.setLights(carExtraInfoDTO.lights());
        carExtraInfo.setTiresAndWheels(carExtraInfoDTO.tiresAndWheels());
        carExtraInfo.setSteering(carExtraInfoDTO.steering());
        carExtraInfo.setSeats(carExtraInfoDTO.seats());
        carExtraInfo.setInteriorFeatures(carExtraInfoDTO.interiorFeatures());
        carExtraInfo.setSportFeatures(carExtraInfoDTO.sportFeatures());
        carExtraInfo.setComfortFeatures(carExtraInfoDTO.comfortFeatures());
        carExtraInfo.setAudioVideoCommunication(carExtraInfoDTO.audioVideoCommunication());
        carExtraInfo.setAdditional(carExtraInfoDTO.additional());
        carExtraInfoRepository.save(carExtraInfo);
    }
}
