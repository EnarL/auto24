package com.example.auto24.users;

import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static UserPrincipal getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal) {
            return (UserPrincipal) principal;
        }
        throw new IllegalStateException("User is not authenticated");
    }
    public static String getAuthenticatedUserId() {
        return getAuthenticatedUser().getUserId();
    }
}