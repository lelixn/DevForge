package com.devforge.user.dto;

import com.devforge.user.entity.UserRole;
import com.devforge.user.entity.UserStatus;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public class UserDto {

    private UUID id;
    private String email;
    private String username;
    private String displayName;
    private String avatarUrl;
    private UserStatus status;
    private boolean emailVerified;
    private Set<UserRole> roles;
    private Instant createdAt;
    private Instant lastLoginAt;

    public UserDto() {
    }

    public UserDto(UUID id, String email, String username, String displayName, String avatarUrl, UserStatus status, boolean emailVerified, Set<UserRole> roles, Instant createdAt, Instant lastLoginAt) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.displayName = displayName;
        this.avatarUrl = avatarUrl;
        this.status = status;
        this.emailVerified = emailVerified;
        this.roles = roles;
        this.createdAt = createdAt;
        this.lastLoginAt = lastLoginAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Set<UserRole> getRoles() {
        return roles;
    }

    public void setRoles(Set<UserRole> roles) {
        this.roles = roles;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(Instant lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }
}
