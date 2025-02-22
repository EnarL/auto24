package com.example.auto24.auth.refreshtoken;

import com.example.auto24.users.Users;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "refreshTokens")
public class RefreshToken {
    @Id
    private String id;
    private String token;
    private LocalDateTime expiryDate;
    private Users user;
}