package com.devforge.user.mapper;

import com.devforge.user.dto.UserDto;
import com.devforge.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getDisplayName(),
                user.getAvatarUrl(),
                user.getStatus(),
                user.isEmailVerified(),
                user.getRoles(),
                user.getCreatedAt(),
                user.getLastLoginAt()
        );
    }
}
