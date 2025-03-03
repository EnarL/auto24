package com.example.auto24;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableAsync(proxyTargetClass = true)
public class Auto24Application {
	public static void main(String[] args) {

		// Default to using backend directory
		String envDirectory = "backend";

		// Check if running in Docker (you can use an environment variable set by Docker, like HOSTNAME)
		if (System.getenv("HOSTNAME") != null) {
			envDirectory = "/app"; // For Docker, use '/app'
		}

		// Load environment variables from the determined directory
		Dotenv dotenv = Dotenv.configure().directory(envDirectory).load();

		// Set the system properties from .env
		System.setProperty("AWS_SECRET_ACCESS_KEY", dotenv.get("AWS_SECRET_ACCESS_KEY"));
		System.setProperty("AWS_ACCESS_KEY_ID", dotenv.get("AWS_ACCESS_KEY_ID"));
		System.setProperty("AWS_REGION", dotenv.get("AWS_REGION"));
		System.setProperty("AWS_BUCKET_NAME", dotenv.get("AWS_BUCKET_NAME"));
		System.setProperty("MAIL_HOST", dotenv.get("MAIL_HOST"));
		System.setProperty("MAIL_PORT", dotenv.get("MAIL_PORT"));
		System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME"));
		System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));
		System.setProperty("MAIL_SMTP_AUTH", dotenv.get("MAIL_SMTP_AUTH"));
		System.setProperty("MAIL_STARTTLS_ENABLE", dotenv.get("MAIL_STARTTLS_ENABLE"));
		System.setProperty("MAIL_DEBUG", dotenv.get("MAIL_DEBUG"));
		System.setProperty("MONGODB_URI_PASSWORD", dotenv.get("MONGODB_URI_PASSWORD"));
		System.setProperty("MONGODB_URI_USERNAME", dotenv.get("MONGODB_URI_USERNAME"));
		System.setProperty("APP_FRONTEND_URL", dotenv.get("APP_FRONTEND_URL"));
		System.setProperty("APP_BACKEND_URL", dotenv.get("APP_BACKEND_URL"));

		// Start the Spring Boot application
		SpringApplication.run(Auto24Application.class, args);
	}
}
