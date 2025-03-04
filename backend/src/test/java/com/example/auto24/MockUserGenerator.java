package com.example.auto24;

import com.example.auto24.users.Role;
import com.example.auto24.users.Users;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class MockUserGenerator {

    public static Users createMockUser() {
        return Users.builder()
                .id(UUID.randomUUID().toString())
                .username("testuser" + System.currentTimeMillis())
                .firstname("John")
                .lastname("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .phoneNumber("+1234567890")
                .newsletter(false)
                .carIds(Collections.emptyList())
                .active(true)
                .agreedToTerms(true)
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public static Users createMockAdminUser() {
        return Users.builder()
                .id(UUID.randomUUID().toString())
                .username("adminuser" + System.currentTimeMillis())
                .firstname("Admin")
                .lastname("User")
                .email("admin@example.com")
                .password("adminpassword123")
                .phoneNumber("+0987654321")
                .newsletter(false)
                .carIds(Collections.emptyList())
                .active(true)
                .agreedToTerms(true)
                .role(Role.ADMIN)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
    public static Users createMockUserWithCars(int numberOfCars) {
        Users user = createMockUser();  // Creating a basic mock user

        // Create a new mutable list and populate it with UUIDs
        List<String> carIds = new ArrayList<>();
        for (int i = 0; i < numberOfCars; i++) {
            carIds.add(UUID.randomUUID().toString());  // Add UUIDs to the carIds list
        }

        // Set the newly created list on the user
        user.setCarIds(carIds);

        System.out.println(user.getCarIds());
        return user;
    }



    public static Users createMockInactiveUser() {
        Users user = createMockUser();
        user.setActive(false);
        return user;
    }
    @Test
    void testUserCreation() {
        Users user = MockUserGenerator.createMockUser();
        assertNotNull(user);
        assertEquals(Role.USER, user.getRole());
    }

    @Test
    void testAdminUserCreation() {
        Users adminUser = MockUserGenerator.createMockAdminUser();
        assertNotNull(adminUser);
        assertEquals(Role.ADMIN, adminUser.getRole());
    }
    @Test
    void TestInActiveUser(){
        Users inactiveUser = MockUserGenerator.createMockInactiveUser();
        assertNotNull(inactiveUser);
        assertEquals(false, inactiveUser.isActive());
    }
    @Test
    void testUserWithCarsCreation() {
        int numberOfCars = 3;
        Users user = MockUserGenerator.createMockUserWithCars(numberOfCars); // Create mock user with 3 cars
        assertNotNull(user);
        assertEquals(numberOfCars, user.getCarIds().size());  // Verifies the correct number of cars
    }

}