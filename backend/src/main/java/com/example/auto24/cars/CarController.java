package com.example.auto24.cars;
import com.example.auto24.users.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.auto24.users.UserRepository;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable String id) {
        return carService.getCarById(id);
    }

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carService.saveCar(car);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable String id) {
        carService.deleteCar(id);
    }

    @GetMapping("/users/{userId}/cars")
    public ResponseEntity<List<Car>> getUserPostedCars(@PathVariable String userId) {
        List<Car> cars = carService.getUserPostedCars(userId);
        return ResponseEntity.ok(cars);
    }

}