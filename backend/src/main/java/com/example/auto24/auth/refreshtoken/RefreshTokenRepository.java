package com.example.auto24.auth.refreshtoken;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    RefreshToken findByUserId(String userId);

}