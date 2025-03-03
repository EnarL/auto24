package com.example.auto24.cars.extra_info;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CarExtraInfoMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "carId", ignore = true)
    void updateCarExtraInfoFromDto(CarExtraInfoDTO source, @MappingTarget CarExtraInfo target);
}