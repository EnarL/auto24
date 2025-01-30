package com.example.auto24.cars;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Document(collection = "cars")
public class Car {
    @Id
    private String id;
    private List<String> imageKeys;
    private String ownerId;
    @CreatedDate
    private LocalDateTime createdAt;
    private LocalDateTime expirationDate;

}