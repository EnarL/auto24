package com.example.auto24.users;

import org.springframework.stereotype.Component;

@Component
public class UsersToDTO {
    public static UsersDTO map(Users users) {
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
