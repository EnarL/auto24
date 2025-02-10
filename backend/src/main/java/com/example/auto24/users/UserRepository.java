package com.example.auto24.users;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Users, String> {
    Users findByUsername(String username);
    Users findByEmail(String email);
    boolean existsByUsernameOrEmail(String username, String email);
}