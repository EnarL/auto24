package com.example.auto24.cars.extra_info;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CarExtraInfoMapper {
    void updateCarExtraInfoFromDto(CarExtraInfoDTO source, @MappingTarget CarExtraInfo target);
}