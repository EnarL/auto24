package com.example.auto24.authServiceTests;

import com.example.auto24.auth.AuthService;
import com.example.auto24.auth.TokenService;
import com.example.auto24.auth.JWTUtil;
import com.example.auto24.users.UserRepository;
import com.example.auto24.users.UserLoginRequest;
import com.example.auto24.users.Users;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AuthServiceTests {

    @InjectMocks
    private AuthService authService;

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
    private Authentication authentication;

    @Mock
    private UserDetails userDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginSuccess() {
        UserLoginRequest request = new UserLoginRequest("testUser", "testPassword");
        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userRepository.findByUsername("testUser")).thenReturn(new Users());

        authService.login(request, response);

        verify(tokenService).generateAndSetTokens(any(), eq(response));
    }

    @Test
    void testLogout() {
        authService.logout(response);
        verify(tokenService).clearTokens(response);
    }

    @Test
    void testCheckSessionInvalidToken() {
        // Mocking request and cookies
        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getCookies()).thenReturn(new Cookie[]{new Cookie("accessToken", "invalidToken")});
        when(jwtUtil.validateToken("invalidToken")).thenReturn(false);

        assertThrows(ResponseStatusException.class, () -> authService.checkSession(request));
    }

}
