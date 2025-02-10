package com.example.auto24.auth;

import com.example.auto24.users.Users;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public TokenService(JWTUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public void generateAndSetTokens(Users user, HttpServletResponse response) {
        String accessToken = jwtUtil.generateToken(user.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());
        String hashedRefreshToken = passwordEncoder.encode(refreshToken);

        addCookie(response, "accessToken", accessToken, 900, true, "Strict");
        addCookie(response, "refreshToken", hashedRefreshToken, 7 * 24 * 60 * 60, true, "Strict");
    }

    public void clearTokens(HttpServletResponse response) {
        addCookie(response, "accessToken", "", 0, false, "Strict");
        addCookie(response, "refreshToken", "", 0, true, "Strict");
    }

    public void addCookie(HttpServletResponse response, String name, String value, int maxAge, boolean httpOnly, String sameSite) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(httpOnly);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
        response.addHeader("Set-Cookie", String.format("%s=%s; Max-Age=%d; Path=/; Secure; HttpOnly=%b; SameSite=%s", name, value, maxAge, httpOnly, sameSite));
    }
}