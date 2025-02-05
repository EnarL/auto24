package com.example.auto24.cars;


import com.example.auto24.cars.extra_info.CarExtraInfoDTO;

public record CarListingRequest (
        CarDetailsDTO carDetailsDTO,
        CarExtraInfoDTO carExtraInfoDTO
){
}
