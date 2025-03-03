package com.example.auto24.cars;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CarDetailsUpdateMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    void updateCarDetailsFromDto(CarDetailsDTO source, @MappingTarget CarDetails target);
}