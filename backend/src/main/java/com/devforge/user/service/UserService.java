package com.devforge.user.service;

import com.devforge.user.dto.UpdateUserProfileRequest;
import com.devforge.user.dto.UserDto;

import java.util.UUID;

public interface UserService {
    UserDto getCurrentUser(UUID userId);
    UserDto updateProfile(UUID userId, UpdateUserProfileRequest request);
    UserDto getUserById(UUID userId);
}
