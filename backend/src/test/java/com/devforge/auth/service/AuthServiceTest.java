package com.devforge.auth.service;

import com.devforge.auth.dto.AuthResponse;
import com.devforge.auth.dto.LoginRequest;
import com.devforge.auth.dto.RegisterRequest;
import com.devforge.auth.entity.RefreshToken;
import com.devforge.auth.repository.EmailVerificationTokenRepository;
import com.devforge.auth.repository.LoginHistoryRepository;
import com.devforge.auth.repository.PasswordResetTokenRepository;
import com.devforge.auth.repository.RefreshTokenRepository;
import com.devforge.common.exception.ConflictException;
import com.devforge.common.exception.UnauthorizedException;
import com.devforge.email.EmailService;
import com.devforge.security.JwtTokenProvider;
import com.devforge.user.entity.User;
import com.devforge.user.entity.UserRole;
import com.devforge.user.entity.UserStatus;
import com.devforge.user.mapper.UserMapper;
import com.devforge.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private RefreshTokenRepository refreshTokenRepository;
    @Mock
    private EmailVerificationTokenRepository emailVerificationTokenRepository;
    @Mock
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Mock
    private LoginHistoryRepository loginHistoryRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtTokenProvider tokenProvider;
    @Mock
    private UserMapper userMapper;
    @Mock
    private EmailService emailService;

    @InjectMocks
    private AuthServiceImpl authService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(UUID.randomUUID());
        testUser.setEmail("john.doe@devforge.io");
        testUser.setUsername("johndoe");
        testUser.setDisplayName("John Doe");
        testUser.setPassword("hashedPassword");
        testUser.setStatus(UserStatus.ACTIVE);
        testUser.setEnabled(true);
        testUser.setRoles(Set.of(UserRole.ROLE_USER));
    }

    @Test
    @DisplayName("Should successfully register a new user")
    void register_success() {
        RegisterRequest request = new RegisterRequest("john.doe@devforge.io", "johndoe", "John Doe", "P@ssword12345");

        given(userRepository.existsByEmail(anyString())).willReturn(false);
        given(userRepository.existsByUsername(anyString())).willReturn(false);
        given(passwordEncoder.encode(anyString())).willReturn("hashedPassword");
        given(userRepository.save(any(User.class))).willReturn(testUser);
        given(tokenProvider.generateAccessToken(any(User.class))).willReturn("mock-access-token");
        given(tokenProvider.generateRefreshToken(any(User.class))).willReturn("mock-refresh-token");
        given(tokenProvider.getJwtExpirationMs()).willReturn(900000L);
        given(refreshTokenRepository.save(any(RefreshToken.class))).willAnswer(invocation -> invocation.getArgument(0));

        AuthResponse response = authService.register(request);

        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("mock-access-token");
        assertThat(response.getRefreshToken()).isEqualTo("mock-refresh-token");
        verify(emailService).sendVerificationEmail(anyString(), anyString());
    }

    @Test
    @DisplayName("Should throw ConflictException when email is already registered")
    void register_duplicateEmail() {
        RegisterRequest request = new RegisterRequest("john.doe@devforge.io", "johndoe", "John Doe", "P@ssword12345");
        given(userRepository.existsByEmail("john.doe@devforge.io")).willReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("Email is already registered");
    }

    @Test
    @DisplayName("Should successfully login user with valid credentials")
    void login_success() {
        LoginRequest request = new LoginRequest("johndoe", "P@ssword12345");

        given(userRepository.findByEmailOrUsername("johndoe", "johndoe")).willReturn(Optional.of(testUser));
        given(passwordEncoder.matches("P@ssword12345", "hashedPassword")).willReturn(true);
        given(tokenProvider.generateAccessToken(any(User.class))).willReturn("mock-access-token");
        given(tokenProvider.generateRefreshToken(any(User.class))).willReturn("mock-refresh-token");
        given(tokenProvider.getJwtExpirationMs()).willReturn(900000L);

        AuthResponse response = authService.login(request, "127.0.0.1", "JUnit-Agent");

        assertThat(response).isNotNull();
        assertThat(response.getAccessToken()).isEqualTo("mock-access-token");
        verify(loginHistoryRepository).save(any());
    }

    @Test
    @DisplayName("Should throw UnauthorizedException when password matches fail")
    void login_wrongPassword() {
        LoginRequest request = new LoginRequest("johndoe", "WrongPassword1!");

        given(userRepository.findByEmailOrUsername("johndoe", "johndoe")).willReturn(Optional.of(testUser));
        given(passwordEncoder.matches("WrongPassword1!", "hashedPassword")).willReturn(false);

        assertThatThrownBy(() -> authService.login(request, "127.0.0.1", "JUnit-Agent"))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessageContaining("Invalid email/username or password");
    }
}
