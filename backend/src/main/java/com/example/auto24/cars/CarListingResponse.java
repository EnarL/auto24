package com.example.auto24.cars;

import com.example.auto24.cars.extra_info.CarExtraInfoDTO;

public record CarListingResponse(
        CarDetailsDTO carDetailsDTO,
        CarExtraInfoDTO carExtraInfoDTO
) {
}
