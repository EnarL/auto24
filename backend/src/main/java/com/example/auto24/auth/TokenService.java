package com.example.auto24.auth;

import com.example.auto24.auth.refreshtoken.RefreshToken;
import com.example.auto24.auth.refreshtoken.RefreshTokenRepository;
import com.example.auto24.users.SecurityUtils;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.Users;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;

@Service
public class TokenService {
    private final JWTUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public TokenService(JWTUtil jwtUtil, RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public void generateAndSetTokens(Users user, HttpServletResponse response) {
        String accessToken = jwtUtil.generateToken(user.getUsername());

        // Delete all existing refresh tokens for this user
        refreshTokenRepository.deleteAllByUserId(user.getId());

        // Create a new refresh token
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getUsername());
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserId(user.getId());
        refreshToken.setToken(newRefreshToken);
        refreshToken.setExpiryDate(LocalDateTime.now().plusWeeks(1));
        refreshTokenRepository.save(refreshToken);

        addHttpOnlyCookie(response, "accessToken", accessToken, 600);
    }

    public void clearTokens(HttpServletResponse response) {
        addHttpOnlyCookie(response, "accessToken", "", 0);
    }

    public void refreshToken(HttpServletResponse response) {
        String userId = SecurityUtils.getAuthenticatedUserId();
        Users user = userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found"));
        RefreshToken storedToken = refreshTokenRepository.findByUserId(userId);
        if (storedToken == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No refresh token found for user");
        }
        if (!jwtUtil.validateToken(storedToken.getToken())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid refresh token");
        }

        String newAccessToken = jwtUtil.generateToken(user.getUsername());
        addHttpOnlyCookie(response, "accessToken", newAccessToken, 600);
    }

    public void addHttpOnlyCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        cookie.setAttribute("SameSite", "None");
        response.addCookie(cookie);
    }
}