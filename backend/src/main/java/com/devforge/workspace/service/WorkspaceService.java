package com.devforge.workspace.service;

import com.devforge.workspace.dto.AcceptInviteRequest;
import com.devforge.workspace.dto.CreateWorkspaceRequest;
import com.devforge.workspace.dto.InviteMemberRequest;
import com.devforge.workspace.dto.UpdateWorkspaceRequest;
import com.devforge.workspace.dto.WorkspaceDto;
import com.devforge.workspace.dto.WorkspaceMemberDto;

import java.util.List;
import java.util.UUID;

public interface WorkspaceService {
    WorkspaceDto createWorkspace(UUID ownerId, CreateWorkspaceRequest request);
    WorkspaceDto getWorkspaceById(UUID workspaceId, UUID currentUserId);
    List<WorkspaceDto> getUserWorkspaces(UUID userId);
    WorkspaceDto updateWorkspace(UUID workspaceId, UUID currentUserId, UpdateWorkspaceRequest request);
    void deleteWorkspace(UUID workspaceId, UUID currentUserId);
    WorkspaceMemberDto inviteMember(UUID workspaceId, UUID currentUserId, InviteMemberRequest request);
    WorkspaceMemberDto acceptInvite(UUID currentUserId, AcceptInviteRequest request);
    List<WorkspaceMemberDto> getWorkspaceMembers(UUID workspaceId, UUID currentUserId);
    void removeMember(UUID workspaceId, UUID currentUserId, UUID memberId);
}
