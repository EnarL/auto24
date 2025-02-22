package com.example.auto24.auth;

import com.example.auto24.auth.refreshtoken.RefreshToken;
import com.example.auto24.auth.refreshtoken.RefreshTokenRepository;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@Service
public class TokenService {
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public TokenService(JWTUtil jwtUtil, PasswordEncoder passwordEncoder, RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public void generateAndSetTokens(Users user, HttpServletResponse response) {
        String accessToken = jwtUtil.generateToken(user.getUsername());
        RefreshToken refreshToken = refreshTokenRepository.findByUser(user);

        if (refreshToken == null || refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            String newRefreshToken = jwtUtil.generateRefreshToken(user.getUsername());
            refreshToken = new RefreshToken();
            refreshToken.setUser(user);
            refreshToken.setToken(newRefreshToken);
            refreshToken.setExpiryDate(LocalDateTime.now().plusWeeks(1));
            refreshTokenRepository.save(refreshToken);
        }

        addHttpOnlyCookie(response, "accessToken", accessToken, 900); // 15 minutes
    }

    public void clearTokens(HttpServletResponse response) {
        addHttpOnlyCookie(response, "accessToken", "", 0);
    }
    public void refreshToken(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token is required");
        }

        // Validate the refresh token
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid refresh token");
        }
        String username = jwtUtil.extractUserName(refreshToken);
        Users user = userRepository.findByUsername(username);
        RefreshToken storedToken = refreshTokenRepository.findByUser(user);
        if (storedToken == null || !refreshToken.equals(storedToken.getToken())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token does not match");
        }
        String newAccessToken = jwtUtil.generateToken(username);
        addHttpOnlyCookie(response, "accessToken", newAccessToken, 600); // 10 minutes
    }



    private void addHttpOnlyCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }
}