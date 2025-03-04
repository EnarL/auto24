package com.example.auto24.authServiceTests;

import com.example.auto24.MockUserGenerator;
import com.example.auto24.auth.AuthService;
import com.example.auto24.auth.JWTUtil;
import com.example.auto24.auth.TokenService;
import com.example.auto24.users.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTests {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TokenService tokenService;

    @Mock
    private JWTUtil jwtUtil;

    @Mock
    private HttpServletResponse response;

    @Mock
    private HttpServletRequest request;

    @Mock
    private Authentication authentication;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private AuthService authService;

    private Users mockUser;
    private UserLoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        // Create a mock user using MockUserGenerator
        mockUser = MockUserGenerator.createMockUser();

        // Create a login request
        loginRequest = new UserLoginRequest(mockUser.getUsername(), "password123");
    }

    @Test
    void login_SuccessfulAuthentication_GeneratesTokens() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn(mockUser.getUsername());

        when(userRepository.findByUsername(mockUser.getUsername()))
                .thenReturn(mockUser);

        // Act
        authService.login(loginRequest, response);

        // Assert
        verify(authenticationManager).authenticate(
                argThat(token ->
                        token.getPrincipal().equals(loginRequest.username()) &&
                                token.getCredentials().equals(loginRequest.password())
                )
        );
        verify(tokenService).generateAndSetTokens(mockUser, response);
    }

    @Test
    void logout_ClearsTokens() {
        // Act
        authService.logout(response);

        // Assert
        verify(tokenService).clearTokens(response);
    }

    @Test
    void checkSession_ValidToken_DoesNotThrowException() {
        // Arrange
        Cookie accessTokenCookie = new Cookie("accessToken", "valid-token");
        Cookie[] cookies = {accessTokenCookie};

        when(request.getCookies()).thenReturn(cookies);
        when(jwtUtil.validateToken("valid-token")).thenReturn(true);

        // Act & Assert
        assertDoesNotThrow(() -> authService.checkSession(request));
    }

    @Test
    void checkSession_MissingToken_ThrowsUnauthorizedException() {
        // Arrange
        when(request.getCookies()).thenReturn(null);

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> authService.checkSession(request));
    }

    @Test
    void checkSession_InvalidToken_ThrowsUnauthorizedException() {
        // Arrange
        Cookie accessTokenCookie = new Cookie("accessToken", "invalid-token");
        Cookie[] cookies = {accessTokenCookie};

        when(request.getCookies()).thenReturn(cookies);
        when(jwtUtil.validateToken("invalid-token")).thenReturn(false);

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> authService.checkSession(request));
    }

    @Test
    void checkSession_WrongCookieName_ThrowsUnauthorizedException() {
        // Arrange
        Cookie wrongNameCookie = new Cookie("wrongToken", "some-token");
        Cookie[] cookies = {wrongNameCookie};

        when(request.getCookies()).thenReturn(cookies);

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> authService.checkSession(request));
    }
}