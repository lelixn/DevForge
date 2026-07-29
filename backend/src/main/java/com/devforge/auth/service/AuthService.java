package com.devforge.auth.service;

import com.devforge.auth.dto.AuthResponse;
import com.devforge.auth.dto.ForgotPasswordRequest;
import com.devforge.auth.dto.LoginRequest;
import com.devforge.auth.dto.RefreshTokenRequest;
import com.devforge.auth.dto.RegisterRequest;
import com.devforge.auth.dto.ResetPasswordRequest;
import com.devforge.auth.dto.VerifyEmailRequest;

import java.util.UUID;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(RefreshTokenRequest request);
    void logout(UUID userId);
    void forgotPassword(ForgotPasswordRequest request);
    void resetPassword(ResetPasswordRequest request);
    void verifyEmail(VerifyEmailRequest request);
}
