package com.devforge.user.controller;

import com.devforge.common.response.ApiResponse;
import com.devforge.security.SecurityUtils;
import com.devforge.user.dto.UpdateUserProfileRequest;
import com.devforge.user.dto.UserDto;
import com.devforge.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Tag(name = "User Management", description = "Endpoints for managing user profiles and querying accounts")
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get current authenticated user profile")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        UserDto user = userService.getCurrentUser(currentUserId);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @Operation(summary = "Update current user profile")
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(@Valid @RequestBody UpdateUserProfileRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        UserDto updatedUser = userService.updateProfile(currentUserId, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updatedUser));
    }

    @Operation(summary = "Get user details by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('workspace:read')")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable UUID id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
}
