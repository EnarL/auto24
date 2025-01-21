// backend/src/main/java/com/example/auto24/config/EnvConfig.java
package com.example.auto24.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {

    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure()
                .directory("backend")
                .load();
    }
}