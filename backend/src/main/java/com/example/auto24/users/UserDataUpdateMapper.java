package com.example.auto24.users;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserDataUpdateMapper {
///TEGELT PEAKS OLEMA DTO KAUDU
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "carIds", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "agreedToTerms", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateUserDetailsFromDto(UpdateUserDataRequest source, @MappingTarget Users target);

    @Condition
    default boolean isNotEmpty(String value) {
        return value != null && !value.isBlank();
    }
}