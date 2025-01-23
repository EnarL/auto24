package com.example.auto24.cars;

import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final UserRepository userRepository;
    private final CarRepository carRepository;

    public CarService(UserRepository userRepository, CarRepository carRepository) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car getCarById(String id) {
        return carRepository.findById(id).orElse(null);
    }

    public Car saveCar(Car car) {
        Users owner = userRepository.findById(car.getOwnerId()).orElse(null);
        if (owner != null) {
            Car savedCar = carRepository.save(car);
            owner.getCarIds().add(savedCar.getId());
            userRepository.save(owner);
            return savedCar;
        }
        return null;
    }

    public void deleteCar(String id) {
        Car car = carRepository.findById(id).orElse(null);
        if (car != null) {
            Users owner = userRepository.findById(car.getOwnerId()).orElse(null);
            if (owner != null) {
                owner.getCarIds().remove(car.getId());
                userRepository.save(owner);
            }
            carRepository.deleteById(id);
        }
    }
}