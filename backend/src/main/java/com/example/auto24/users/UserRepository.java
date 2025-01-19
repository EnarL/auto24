package com.example.auto24.users;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Users, String> {
    Users findByUsernameAndPassword(String username, String password);
    Users findByUsername(String username);

}