package com.devforge.auth.service;

import com.devforge.auth.dto.AuthResponse;
import com.devforge.auth.dto.ForgotPasswordRequest;
import com.devforge.auth.dto.LoginRequest;
import com.devforge.auth.dto.LogoutRequest;
import com.devforge.auth.dto.RefreshTokenRequest;
import com.devforge.auth.dto.RegisterRequest;
import com.devforge.auth.dto.ResetPasswordRequest;
import com.devforge.auth.dto.VerifyEmailRequest;
import com.devforge.auth.entity.EmailVerificationToken;
import com.devforge.auth.entity.LoginHistory;
import com.devforge.auth.entity.PasswordResetToken;
import com.devforge.auth.entity.RefreshToken;
import com.devforge.auth.repository.EmailVerificationTokenRepository;
import com.devforge.auth.repository.LoginHistoryRepository;
import com.devforge.auth.repository.PasswordResetTokenRepository;
import com.devforge.auth.repository.RefreshTokenRepository;
import com.devforge.common.exception.BadRequestException;
import com.devforge.common.exception.ConflictException;
import com.devforge.common.exception.ResourceNotFoundException;
import com.devforge.common.exception.UnauthorizedException;
import com.devforge.email.EmailService;
import com.devforge.security.JwtTokenProvider;
import com.devforge.security.UserPrincipal;
import com.devforge.user.entity.User;
import com.devforge.user.entity.UserRole;
import com.devforge.user.entity.UserStatus;
import com.devforge.user.mapper.UserMapper;
import com.devforge.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final LoginHistoryRepository loginHistoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final UserMapper userMapper;
    private final EmailService emailService;

    public AuthServiceImpl(
            UserRepository userRepository,
            RefreshTokenRepository refreshTokenRepository,
            EmailVerificationTokenRepository emailVerificationTokenRepository,
            PasswordResetTokenRepository passwordResetTokenRepository,
            LoginHistoryRepository loginHistoryRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider,
            UserMapper userMapper,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.loginHistoryRepository = loginHistoryRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.userMapper = userMapper;
        this.emailService = emailService;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email is already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException("Username is already taken");
        }

        User user = new User();
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setUsername(request.getUsername().trim());
        user.setDisplayName(request.getDisplayName().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(UserStatus.ACTIVE);
        user.setEnabled(true);
        user.setEmailVerified(false);
        user.setRoles(Set.of(UserRole.ROLE_USER));

        User savedUser = userRepository.save(user);

        // Generate Verification Token & Send Email
        String verifyTokenStr = UUID.randomUUID().toString();
        EmailVerificationToken verifyToken = new EmailVerificationToken();
        verifyToken.setToken(verifyTokenStr);
        verifyToken.setUser(savedUser);
        verifyToken.setExpiryDate(Instant.now().plusSeconds(86400)); // 24 hours
        emailVerificationTokenRepository.save(verifyToken);

        emailService.sendVerificationEmail(savedUser.getEmail(), verifyTokenStr);

        return createAuthResponseForUser(savedUser, "Registration");
    }

    @Override
    public AuthResponse login(LoginRequest request, String ipAddress, String userAgent) {
        String identifier = request.getEmailOrUsername().trim();
        User user = userRepository.findByEmailOrUsername(identifier, identifier)
                .orElseThrow(() -> new UnauthorizedException("Invalid email/username or password"));

        if (!user.isEnabled() || user.getStatus() == UserStatus.SUSPENDED) {
            recordLoginHistory(user, ipAddress, userAgent, false);
            throw new UnauthorizedException("Account is disabled or suspended");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            user.setFailedLoginCount(user.getFailedLoginCount() + 1);
            userRepository.save(user);
            recordLoginHistory(user, ipAddress, userAgent, false);
            throw new UnauthorizedException("Invalid email/username or password");
        }

        // Successful Login
        user.setFailedLoginCount(0);
        user.setLastLoginAt(Instant.now());
        userRepository.save(user);
        recordLoginHistory(user, ipAddress, userAgent, true);

        return createAuthResponseForUser(user, deviceInfoFromAgent(userAgent));
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String requestToken = request.getRefreshToken();
        RefreshToken refreshToken = refreshTokenRepository.findByToken(requestToken)
                .orElseThrow(() -> new UnauthorizedException("Invalid or expired refresh token"));

        if (refreshToken.isRevoked() || refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new UnauthorizedException("Refresh token is revoked or expired");
        }

        User user = refreshToken.getUser();

        // Token Rotation: Revoke old token
        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);

        // Generate new pair
        return createAuthResponseForUser(user, refreshToken.getDeviceInfo());
    }

    @Override
    public void logout(LogoutRequest request, UserPrincipal currentUser) {
        if (request != null && request.getRefreshToken() != null && !request.getRefreshToken().isBlank()) {
            refreshTokenRepository.findByToken(request.getRefreshToken())
                    .ifPresent(token -> {
                        token.setRevoked(true);
                        refreshTokenRepository.save(token);
                    });
        }
        if (currentUser != null) {
            User user = userRepository.findById(currentUser.getId()).orElse(null);
            if (user != null) {
                refreshTokenRepository.revokeAllUserTokens(user);
            }
        }
    }

    @Override
    public void forgotPassword(ForgotPasswordRequest request) {
        userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .ifPresent(user -> {
                    String resetTokenStr = UUID.randomUUID().toString();
                    PasswordResetToken resetToken = new PasswordResetToken();
                    resetToken.setToken(resetTokenStr);
                    resetToken.setUser(user);
                    resetToken.setExpiryDate(Instant.now().plusSeconds(3600)); // 1 hour
                    passwordResetTokenRepository.save(resetToken);

                    emailService.sendPasswordResetEmail(user.getEmail(), resetTokenStr);
                });
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new ResourceNotFoundException("Password reset token is invalid or expired"));

        if (resetToken.isUsed() || resetToken.getExpiryDate().isBefore(Instant.now())) {
            throw new BadRequestException("Password reset token has already been used or has expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setLastPasswordChangeAt(Instant.now());
        userRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);

        // Revoke active refresh tokens
        refreshTokenRepository.revokeAllUserTokens(user);
    }

    @Override
    public void verifyEmail(VerifyEmailRequest request) {
        EmailVerificationToken verifyToken = emailVerificationTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new ResourceNotFoundException("Verification token is invalid or expired"));

        if (verifyToken.isUsed() || verifyToken.getExpiryDate().isBefore(Instant.now())) {
            throw new BadRequestException("Verification token has already been used or has expired");
        }

        User user = verifyToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        verifyToken.setUsed(true);
        emailVerificationTokenRepository.save(verifyToken);
    }

    private AuthResponse createAuthResponseForUser(User user, String deviceInfo) {
        String accessToken = tokenProvider.generateAccessToken(user);
        String refreshTokenStr = tokenProvider.generateRefreshToken(user);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(refreshTokenStr);
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(Instant.now().plusMillis(tokenProvider.getRefreshExpirationMs()));
        refreshToken.setRevoked(false);
        refreshToken.setDeviceInfo(deviceInfo);
        refreshTokenRepository.save(refreshToken);

        long expiresInSeconds = tokenProvider.getJwtExpirationMs() / 1000;
        return new AuthResponse(accessToken, refreshTokenStr, "Bearer", expiresInSeconds, userMapper.toDto(user));
    }

    private void recordLoginHistory(User user, String ipAddress, String userAgent, boolean success) {
        LoginHistory history = new LoginHistory();
        history.setUser(user);
        history.setIpAddress(ipAddress);
        history.setUserAgent(userAgent);
        history.setSuccess(success);
        history.setLoginTime(Instant.now());
        loginHistoryRepository.save(history);
    }

    private String deviceInfoFromAgent(String userAgent) {
        if (userAgent == null || userAgent.isBlank()) return "Unknown Device";
        if (userAgent.length() > 200) return userAgent.substring(0, 200);
        return userAgent;
    }
}
