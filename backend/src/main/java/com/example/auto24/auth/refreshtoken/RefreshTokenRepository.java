package com.example.auto24.auth.refreshtoken;

import com.example.auto24.users.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    RefreshToken findByUser(Users user);

    RefreshToken findByToken(String token);
}