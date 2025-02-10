package com.example.auto24.cars;

import java.util.List;
public record CarPreviewDTO(
        String id,
        String title,
        double price,
        String firstRegistrationDate,
        List<String> imageKeys
) {

}
