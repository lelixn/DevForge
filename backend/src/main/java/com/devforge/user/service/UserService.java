package com.devforge.user.service;

import com.devforge.security.UserPrincipal;
import com.devforge.user.dto.ChangePasswordRequest;
import com.devforge.user.dto.UpdateProfileRequest;
import com.devforge.user.dto.UserDto;

public interface UserService {

    UserDto getCurrentUser(UserPrincipal currentUser);

    UserDto updateProfile(UserPrincipal currentUser, UpdateProfileRequest request);

    void changePassword(UserPrincipal currentUser, ChangePasswordRequest request);
}
