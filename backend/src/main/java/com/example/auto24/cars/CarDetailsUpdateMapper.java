package com.example.auto24.cars;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CarDetailsUpdateMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCarDetailsFromDto(CarDetailsDTO source, @MappingTarget CarDetails target);
}