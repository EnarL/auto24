package com.example.auto24.users;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<Users, String> {
    Users findByUsername(String username);
    Users findByEmail(String email);
    boolean existsByUsernameOrEmail(String username, String email);
    Optional<Users> findById(String id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}