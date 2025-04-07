package com.example.auto24.cars.extra_info;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class CarExtraInfoService {

    private final CarExtraInfoRepository carExtraInfoRepository;
    private final CarExtraInfoDTOMapper carExtraInfoDTOMapper;
    private final CarExtraInfoMapper carExtraInfoMapper;

    public CarExtraInfoService(CarExtraInfoRepository carExtraInfoRepository, CarExtraInfoDTOMapper carExtraInfoDTOMapper, CarExtraInfoMapper carExtraInfoMapper) {
        this.carExtraInfoRepository = carExtraInfoRepository;
        this.carExtraInfoDTOMapper = carExtraInfoDTOMapper;
        this.carExtraInfoMapper = carExtraInfoMapper;
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

    public Optional<CarExtraInfoDTO> getCarExtraInfoByCarId(String id) {
        Optional<CarExtraInfo> carExtraInfoOpt = carExtraInfoRepository.findByCarId(id);

        return carExtraInfoOpt.map(carExtraInfoDTOMapper);
    }

    public void deleteCarExtraInfoByCarId(String carId) {
        carExtraInfoRepository.findByCarId(carId).ifPresent(carExtraInfoRepository::delete);
    }
    public void updateCarExtraInfo(String carId, CarExtraInfoDTO carExtraInfoDTO) {
        CarExtraInfo carExtraInfo = carExtraInfoRepository.findByCarId(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car extra info not found"));
        carExtraInfoMapper.updateCarExtraInfoFromDto(carExtraInfoDTO, carExtraInfo);
        carExtraInfoRepository.save(carExtraInfo);
    }
}
