package com.example.auto24.auth.prtoken;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "password_reset_tokens")
public class PasswordResetToken {

    @Id
    private String id;
    @Indexed(unique = true)
    private String token;
    @Indexed
    private String email;
    private boolean isVerified;

    @CreatedDate
    private Instant createdAt;

    private Long expiryDuration;

    public boolean isTokenExpired() {
        return Instant.now().isAfter(createdAt.plusMillis(expiryDuration));
    }
}
