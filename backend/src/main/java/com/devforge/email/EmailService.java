package com.devforge.email;

public interface EmailService {

    void sendVerificationEmail(String recipientEmail, String token);

    void sendPasswordResetEmail(String recipientEmail, String token);

    void sendWelcomeEmail(String recipientEmail, String displayName);
}
