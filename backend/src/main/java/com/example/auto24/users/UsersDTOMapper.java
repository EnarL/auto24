package com.example.auto24.users;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UsersDTOMapper implements Function<Users,UsersDTO> {
    @Override
    public UsersDTO apply(Users users) {
        return new UsersDTO(
                users.getUsername(),
                users.getFirstname(),
                users.getLastname(),
                users.getEmail(),
                users.getPhoneNumber(),
                users.isNewsletter(),
                users.getCarIds()
        );
    }
}

