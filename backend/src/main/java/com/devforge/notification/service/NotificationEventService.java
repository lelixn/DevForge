package com.devforge.notification.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
public class NotificationEventService {

    public void sendEmailVerificationEvent(UUID userId, String email, String token) {
        log.info("Notification Event: Email verification dispatched to user {} with token {}", email, token);
    }

    public void sendPasswordResetEvent(UUID userId, String email, String token) {
        log.info("Notification Event: Password reset email dispatched to user {} with token {}", email, token);
    }

    public void sendWorkspaceInvitationEvent(UUID workspaceId, String email, String role) {
        log.info("Notification Event: Workspace invitation dispatched to {} for workspace {} with role {}", email, workspaceId, role);
    }
}
