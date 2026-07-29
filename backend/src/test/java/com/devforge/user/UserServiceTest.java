package com.devforge.user;

import com.devforge.common.exception.ResourceNotFoundException;
import com.devforge.user.dto.UpdateUserProfileRequest;
import com.devforge.user.dto.UserDto;
import com.devforge.user.entity.User;
import com.devforge.user.mapper.UserMapper;
import com.devforge.user.repository.UserRepository;
import com.devforge.user.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .email("alex@devforge.io")
                .fullName("Alex Mercer")
                .enabled(true)
                .build();
        sampleUser.setId(UUID.randomUUID());
    }

    @Test
    @DisplayName("Should return user profile for existing user ID")
    void getCurrentUser_Success() {
        when(userRepository.findById(sampleUser.getId())).thenReturn(Optional.of(sampleUser));
        when(userMapper.toUserDto(sampleUser)).thenReturn(UserDto.builder().id(sampleUser.getId()).fullName("Alex Mercer").build());

        UserDto userDto = userService.getCurrentUser(sampleUser.getId());

        assertNotNull(userDto);
        assertEquals("Alex Mercer", userDto.getFullName());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when user ID does not exist")
    void getCurrentUser_NotFound() {
        UUID nonExistentId = UUID.randomUUID();
        when(userRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getCurrentUser(nonExistentId));
    }

    @Test
    @DisplayName("Should update user profile name and avatar")
    void updateProfile_Success() {
        UpdateUserProfileRequest request = UpdateUserProfileRequest.builder()
                .fullName("Alex Mercer Updated")
                .avatarUrl("https://devforge.io/avatar.png")
                .build();

        when(userRepository.findById(sampleUser.getId())).thenReturn(Optional.of(sampleUser));
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);
        when(userMapper.toUserDto(sampleUser)).thenReturn(UserDto.builder()
                .id(sampleUser.getId())
                .fullName("Alex Mercer Updated")
                .avatarUrl("https://devforge.io/avatar.png")
                .build());

        UserDto updated = userService.updateProfile(sampleUser.getId(), request);

        assertNotNull(updated);
        assertEquals("Alex Mercer Updated", updated.getFullName());
        verify(userRepository).save(sampleUser);
    }
}
