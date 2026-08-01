package com.devforge.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class MockEmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(MockEmailServiceImpl.class);

    @Override
    public void sendVerificationEmail(String recipientEmail, String token) {
        log.info("[EMAIL DISPATCH] Template: VERIFICATION_EMAIL | To: {} | Token: {}", recipientEmail, token);
    }

    @Override
    public void sendPasswordResetEmail(String recipientEmail, String token) {
        log.info("[EMAIL DISPATCH] Template: PASSWORD_RESET_EMAIL | To: {} | Token: {}", recipientEmail, token);
    }

    @Override
    public void sendWelcomeEmail(String recipientEmail, String displayName) {
        log.info("[EMAIL DISPATCH] Template: WELCOME_EMAIL | To: {} | Name: {}", recipientEmail, displayName);
    }
}
