package com.example.auto24.cars;

import java.time.LocalDateTime;
import java.util.List;

public record CarDTO(
        List<String> imageKeys,
        String ownerId,
        LocalDateTime createdAt,
        LocalDateTime expirationDate) {

}