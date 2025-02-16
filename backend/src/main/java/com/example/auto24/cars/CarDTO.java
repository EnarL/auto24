package com.example.auto24.cars;

import java.time.LocalDateTime;

public record CarDTO(
        String id,
        String ownerId,
        String title,
        LocalDateTime createdAt,
        LocalDateTime expirationDate,
boolean isActive) {

}