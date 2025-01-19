package com.example.auto24.cars;

import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car getCarById(String id) {
        return carRepository.findById(id).orElse(null);
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(String id) {
        carRepository.deleteById(id);
    }

    public Car postCar(Car car) {
        if (car.getId() == null) {
            car.setId(generateUniqueId());
        }
        return carRepository.save(car);
    }
    private String generateUniqueId() {
        // Implement a method to generate a unique ID
        return java.util.UUID.randomUUID().toString();
    }

    public List<Car> getUserPostedCars(String userId) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getPostedCars();
    }
}