package com.devforge.auth;

import com.devforge.auth.dto.AuthResponse;
import com.devforge.auth.dto.LoginRequest;
import com.devforge.auth.dto.RegisterRequest;
import com.devforge.auth.entity.RefreshToken;
import com.devforge.auth.repository.RefreshTokenRepository;
import com.devforge.auth.service.AuthServiceImpl;
import com.devforge.common.exception.ConflictException;
import com.devforge.security.JwtTokenProvider;
import com.devforge.security.UserPrincipal;
import com.devforge.user.dto.UserDto;
import com.devforge.user.entity.Role;
import com.devforge.user.entity.User;
import com.devforge.user.mapper.UserMapper;
import com.devforge.user.repository.RoleRepository;
import com.devforge.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Instant;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private RefreshTokenRepository refreshTokenRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtTokenProvider tokenProvider;
    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;
    private Role sampleRole;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(authService, "refreshExpirationMs", 604800000L);

        sampleRole = Role.builder()
                .name("ROLE_USER")
                .description("Standard User Role")
                .build();
        sampleRole.setId(UUID.randomUUID());

        sampleUser = User.builder()
                .email("test@devforge.io")
                .passwordHash("encoded_password")
                .fullName("Test User")
                .enabled(true)
                .roles(Set.of(sampleRole))
                .build();
        sampleUser.setId(UUID.randomUUID());
    }

    @Test
    @DisplayName("Should successfully register a new user")
    void register_Success() {
        RegisterRequest request = RegisterRequest.builder()
                .email("test@devforge.io")
                .password("Password123!")
                .fullName("Test User")
                .build();

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(sampleRole));
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);
        when(tokenProvider.generateToken(any())).thenReturn("mock_access_token");

        RefreshToken mockRefreshToken = RefreshToken.builder()
                .token("mock_refresh_token")
                .user(sampleUser)
                .expiryDate(Instant.now().plusSeconds(600))
                .build();
        when(refreshTokenRepository.save(any(RefreshToken.class))).thenReturn(mockRefreshToken);
        when(userMapper.toUserDto(any())).thenReturn(UserDto.builder().id(sampleUser.getId()).email("test@devforge.io").build());

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("mock_access_token", response.getAccessToken());
        assertEquals("mock_refresh_token", response.getRefreshToken());
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw ConflictException when email is already registered")
    void register_ConflictException() {
        RegisterRequest request = RegisterRequest.builder()
                .email("test@devforge.io")
                .password("Password123!")
                .fullName("Test User")
                .build();

        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);

        assertThrows(ConflictException.class, () -> authService.register(request));
    }

    @Test
    @DisplayName("Should successfully login user with valid credentials")
    void login_Success() {
        LoginRequest request = LoginRequest.builder()
                .email("test@devforge.io")
                .password("Password123!")
                .build();

        UserPrincipal principal = UserPrincipal.create(sampleUser);
        Authentication auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

        when(authenticationManager.authenticate(any())).thenReturn(auth);
        when(userRepository.findById(sampleUser.getId())).thenReturn(Optional.of(sampleUser));
        when(tokenProvider.generateToken(auth)).thenReturn("mock_access_token");

        RefreshToken mockRefreshToken = RefreshToken.builder()
                .token("mock_refresh_token")
                .user(sampleUser)
                .expiryDate(Instant.now().plusSeconds(600))
                .build();
        when(refreshTokenRepository.save(any(RefreshToken.class))).thenReturn(mockRefreshToken);
        when(userMapper.toUserDto(sampleUser)).thenReturn(UserDto.builder().id(sampleUser.getId()).email("test@devforge.io").build());

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("mock_access_token", response.getAccessToken());
    }
}
