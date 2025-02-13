package com.example.auto24.users;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserDataUpdateMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserDetailsFromDto(UpdateUserDataRequest source, @MappingTarget Users target);

    @Condition
    default boolean isNotEmpty(String value) {
        return value != null && !value.isBlank();
    }
}
