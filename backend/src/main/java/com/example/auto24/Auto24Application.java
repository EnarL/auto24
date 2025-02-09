
package com.example.auto24;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableAsync(proxyTargetClass = true)
public class Auto24Application {

	public static void main(String[] args) {
		SpringApplication.run(Auto24Application.class, args);
	}
}