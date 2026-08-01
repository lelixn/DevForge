package com.devforge.user.controller;

import com.devforge.common.api.ApiResponse;
import com.devforge.security.UserPrincipal;
import com.devforge.user.dto.ChangePasswordRequest;
import com.devforge.user.dto.UpdateProfileRequest;
import com.devforge.user.dto.UserDto;
import com.devforge.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "User Profile Management", description = "User profile retrieval, updates, and credential management APIs.")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user profile", description = "Returns profile details for the currently authenticated user.")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        UserDto userDto = userService.getCurrentUser(currentUser);
        return ResponseEntity.ok(ApiResponse.success(userDto));
    }

    @PatchMapping("/profile")
    @Operation(summary = "Update user profile", description = "Updates user display name and avatar URL.")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody UpdateProfileRequest request) {
        UserDto updatedUser = userService.updateProfile(currentUser, request);
        return ResponseEntity.ok(ApiResponse.success(updatedUser, "Profile updated successfully"));
    }

    @PatchMapping("/change-password")
    @Operation(summary = "Change password", description = "Updates user password and revokes all active refresh tokens.")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(currentUser, request);
        return ResponseEntity.ok(ApiResponse.success(null, "Password changed successfully"));
    }
}
