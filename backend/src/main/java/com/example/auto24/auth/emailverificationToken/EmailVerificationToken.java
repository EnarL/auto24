package com.example.auto24.auth.emailverificationToken;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "email_verification_tokens")
public class EmailVerificationToken {

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