package com.example.auto24.users;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

public class SecurityUtils {

    public static Optional<UserPrincipal> getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal) {
            return Optional.of((UserPrincipal) principal);
        }
        return Optional.empty();  // Return empty if not authenticated
    }


    public static String getAuthenticatedUserId() {
        return SecurityUtils.getAuthenticatedUser()
                .map(UserPrincipal::getUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated")); // Throw exception if not authenticated
    }




}