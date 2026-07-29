package com.devforge.workspace;

import com.devforge.common.exception.ConflictException;
import com.devforge.common.exception.UnauthorizedException;

import com.devforge.user.entity.User;
import com.devforge.user.repository.UserRepository;

import com.devforge.workspace.dto.CreateWorkspaceRequest;
import com.devforge.workspace.dto.WorkspaceDto;
import com.devforge.workspace.entity.Workspace;
import com.devforge.workspace.entity.WorkspaceMember;
import com.devforge.workspace.entity.WorkspaceRole;

import com.devforge.workspace.mapper.WorkspaceMapper;
import com.devforge.workspace.repository.WorkspaceMemberRepository;
import com.devforge.workspace.repository.WorkspaceRepository;
import com.devforge.workspace.service.WorkspaceServiceImpl;

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
class WorkspaceServiceTest {

    @Mock
    private WorkspaceRepository workspaceRepository;
    @Mock
    private WorkspaceMemberRepository workspaceMemberRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private WorkspaceMapper workspaceMapper;

    @InjectMocks
    private WorkspaceServiceImpl workspaceService;

    private User owner;
    private Workspace workspace;

    @BeforeEach
    void setUp() {
        owner = User.builder()
                .email("owner@devforge.io")
                .fullName("Workspace Owner")
                .build();
        owner.setId(UUID.randomUUID());

        workspace = Workspace.builder()
                .name("Core Platform")
                .slug("core-platform")
                .description("Core Platform Workspace")
                .owner(owner)
                .build();
        workspace.setId(UUID.randomUUID());
    }

    @Test
    @DisplayName("Should successfully create a new workspace")
    void createWorkspace_Success() {
        CreateWorkspaceRequest request = CreateWorkspaceRequest.builder()
                .name("Core Platform")
                .slug("core-platform")
                .description("Core Platform Workspace")
                .build();

        when(userRepository.findById(owner.getId())).thenReturn(Optional.of(owner));
        when(workspaceRepository.existsBySlug("core-platform")).thenReturn(false);
        when(workspaceRepository.save(any(Workspace.class))).thenReturn(workspace);
        when(workspaceMapper.toWorkspaceDto(workspace)).thenReturn(WorkspaceDto.builder()
                .id(workspace.getId())
                .name("Core Platform")
                .slug("core-platform")
                .build());

        WorkspaceDto result = workspaceService.createWorkspace(owner.getId(), request);

        assertNotNull(result);
        assertEquals("core-platform", result.getSlug());
        verify(workspaceMemberRepository).save(any(WorkspaceMember.class));
    }

    @Test
    @DisplayName("Should throw ConflictException when workspace slug already exists")
    void createWorkspace_SlugConflict() {
        CreateWorkspaceRequest request = CreateWorkspaceRequest.builder()
                .name("Core Platform")
                .slug("core-platform")
                .build();

        when(userRepository.findById(owner.getId())).thenReturn(Optional.of(owner));
        when(workspaceRepository.existsBySlug("core-platform")).thenReturn(true);

        assertThrows(ConflictException.class, () -> workspaceService.createWorkspace(owner.getId(), request));
    }

    @Test
    @DisplayName("Should throw UnauthorizedException when non-member tries to get workspace details")
    void getWorkspaceById_Unauthorized() {
        UUID nonMemberId = UUID.randomUUID();
        when(workspaceRepository.findById(workspace.getId())).thenReturn(Optional.of(workspace));
        when(workspaceMemberRepository.findByWorkspaceIdAndUserId(workspace.getId(), nonMemberId)).thenReturn(Optional.empty());

        assertThrows(UnauthorizedException.class, () -> workspaceService.getWorkspaceById(workspace.getId(), nonMemberId));
    }
}
