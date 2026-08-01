package com.devforge.security;

import com.devforge.user.entity.User;
import com.devforge.user.entity.UserRole;
import com.devforge.user.entity.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;
    private User testUser;

    @BeforeEach
    void setUp() {
        String secret = "9a6f8b1c4e7d2a5b8c3f6e9d2a5b8c1f4e7d2a5b8c3f6e9d2a5b8c1f4e7d2a5b8c3f6e9d2a5b8c1f4e7d2a5b8c3f6e9d2a5b8c1f4e7d2a5b8c3f6e9d2a5b";
        tokenProvider = new JwtTokenProvider(secret, 900000L, 604800000L);

        testUser = new User();
        testUser.setId(UUID.randomUUID());
        testUser.setEmail("developer@devforge.io");
        testUser.setUsername("devuser");
        testUser.setStatus(UserStatus.ACTIVE);
        testUser.setRoles(Set.of(UserRole.ROLE_USER));
    }

    @Test
    @DisplayName("Should generate valid JWT access token and parse claims")
    void generateAccessToken_andValidate() {
        String accessToken = tokenProvider.generateAccessToken(testUser);

        assertThat(accessToken).isNotNull().isNotBlank();
        assertThat(tokenProvider.validateToken(accessToken)).isTrue();
        assertThat(tokenProvider.getUserIdFromJwt(accessToken)).isEqualTo(testUser.getId());
    }

    @Test
    @DisplayName("Should generate valid JWT refresh token")
    void generateRefreshToken_andValidate() {
        String refreshToken = tokenProvider.generateRefreshToken(testUser);

        assertThat(refreshToken).isNotNull().isNotBlank();
        assertThat(tokenProvider.validateToken(refreshToken)).isTrue();
        assertThat(tokenProvider.getUserIdFromJwt(refreshToken)).isEqualTo(testUser.getId());
    }

    @Test
    @DisplayName("Should reject invalid or malformed JWT token")
    void validateToken_invalidToken() {
        assertThat(tokenProvider.validateToken("invalid.jwt.token")).isFalse();
    }
}
