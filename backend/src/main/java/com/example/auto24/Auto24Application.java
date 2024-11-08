package com.example.auto24;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class Auto24Application {

	public static void main(String[] args) {
		SpringApplication.run(Auto24Application.class, args);
	}

}
