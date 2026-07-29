package com.devforge.workspace.service;

import com.devforge.common.exception.ConflictException;
import com.devforge.common.exception.ResourceNotFoundException;
import com.devforge.common.exception.UnauthorizedException;

import com.devforge.user.entity.User;
import com.devforge.user.repository.UserRepository;

import com.devforge.workspace.dto.AcceptInviteRequest;
import com.devforge.workspace.dto.CreateWorkspaceRequest;
import com.devforge.workspace.dto.InviteMemberRequest;
import com.devforge.workspace.dto.UpdateWorkspaceRequest;
import com.devforge.workspace.dto.WorkspaceDto;
import com.devforge.workspace.dto.WorkspaceMemberDto;

import com.devforge.workspace.entity.Workspace;
import com.devforge.workspace.entity.WorkspaceMember;
import com.devforge.workspace.entity.WorkspaceRole;

import com.devforge.workspace.mapper.WorkspaceMapper;
import com.devforge.workspace.repository.WorkspaceMemberRepository;
import com.devforge.workspace.repository.WorkspaceRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMemberRepository workspaceMemberRepository;
    private final UserRepository userRepository;
    private final WorkspaceMapper workspaceMapper;

    @Override
    @Transactional
    public WorkspaceDto createWorkspace(UUID ownerId, CreateWorkspaceRequest request) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", ownerId));

        if (workspaceRepository.existsBySlug(request.getSlug())) {
            throw new ConflictException("Workspace slug already exists: " + request.getSlug());
        }

        Workspace workspace = Workspace.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .description(request.getDescription())
                .owner(owner)
                .build();

        Workspace savedWorkspace = workspaceRepository.save(workspace);

        WorkspaceMember ownerMember = WorkspaceMember.builder()
                .workspace(savedWorkspace)
                .user(owner)
                .role(WorkspaceRole.OWNER)
                .joinedAt(LocalDateTime.now())
                .build();

        workspaceMemberRepository.save(ownerMember);

        return workspaceMapper.toWorkspaceDto(savedWorkspace);
    }

    @Override
    @Transactional(readOnly = true)
    public WorkspaceDto getWorkspaceById(UUID workspaceId, UUID currentUserId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));

        verifyMember(workspaceId, currentUserId);

        return workspaceMapper.toWorkspaceDto(workspace);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkspaceDto> getUserWorkspaces(UUID userId) {
        List<Workspace> workspaces = workspaceRepository.findAllByUserId(userId);
        return workspaceMapper.toWorkspaceDtoList(workspaces);
    }

    @Override
    @Transactional
    public WorkspaceDto updateWorkspace(UUID workspaceId, UUID currentUserId, UpdateWorkspaceRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));

        WorkspaceMember member = verifyMember(workspaceId, currentUserId);
        if (member.getRole() != WorkspaceRole.OWNER && member.getRole() != WorkspaceRole.ADMIN) {
            throw new UnauthorizedException("Only workspace owners or admins can update workspace settings");
        }

        workspace.setName(request.getName());
        if (request.getDescription() != null) {
            workspace.setDescription(request.getDescription());
        }

        Workspace updated = workspaceRepository.save(workspace);
        return workspaceMapper.toWorkspaceDto(updated);
    }

    @Override
    @Transactional
    public void deleteWorkspace(UUID workspaceId, UUID currentUserId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));

        if (!workspace.getOwner().getId().equals(currentUserId)) {
            throw new UnauthorizedException("Only the workspace owner can delete the workspace");
        }

        workspaceRepository.delete(workspace);
    }

    @Override
    @Transactional
    public WorkspaceMemberDto inviteMember(UUID workspaceId, UUID currentUserId, InviteMemberRequest request) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", workspaceId));

        WorkspaceMember requester = verifyMember(workspaceId, currentUserId);
        if (requester.getRole() != WorkspaceRole.OWNER && requester.getRole() != WorkspaceRole.ADMIN) {
            throw new UnauthorizedException("Only workspace owners or admins can invite new members");
        }

        User targetUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", request.getEmail()));

        if (workspaceMemberRepository.existsByWorkspaceIdAndUserId(workspaceId, targetUser.getId())) {
            throw new ConflictException("User is already a member of this workspace");
        }

        WorkspaceMember newMember = WorkspaceMember.builder()
                .workspace(workspace)
                .user(targetUser)
                .role(request.getRole())
                .joinedAt(LocalDateTime.now())
                .build();

        WorkspaceMember saved = workspaceMemberRepository.save(newMember);
        return workspaceMapper.toWorkspaceMemberDto(saved);
    }

    @Override
    @Transactional
    public WorkspaceMemberDto acceptInvite(UUID currentUserId, AcceptInviteRequest request) {
        Workspace workspace = workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new ResourceNotFoundException("Workspace", "id", request.getWorkspaceId()));

        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUserId));

        if (workspaceMemberRepository.existsByWorkspaceIdAndUserId(request.getWorkspaceId(), currentUserId)) {
            throw new ConflictException("You are already a member of this workspace");
        }

        WorkspaceMember member = WorkspaceMember.builder()
                .workspace(workspace)
                .user(user)
                .role(WorkspaceRole.MEMBER)
                .joinedAt(LocalDateTime.now())
                .build();

        WorkspaceMember saved = workspaceMemberRepository.save(member);
        return workspaceMapper.toWorkspaceMemberDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkspaceMemberDto> getWorkspaceMembers(UUID workspaceId, UUID currentUserId) {
        verifyMember(workspaceId, currentUserId);
        List<WorkspaceMember> members = workspaceMemberRepository.findByWorkspaceId(workspaceId);
        return workspaceMapper.toWorkspaceMemberDtoList(members);
    }

    @Override
    @Transactional
    public void removeMember(UUID workspaceId, UUID currentUserId, UUID memberId) {
        WorkspaceMember requester = verifyMember(workspaceId, currentUserId);
        WorkspaceMember targetMember = workspaceMemberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("WorkspaceMember", "id", memberId));

        if (!targetMember.getWorkspace().getId().equals(workspaceId)) {
            throw new ResourceNotFoundException("Member does not belong to specified workspace");
        }

        if (requester.getRole() != WorkspaceRole.OWNER && requester.getRole() != WorkspaceRole.ADMIN) {
            throw new UnauthorizedException("Only workspace owners or admins can remove members");
        }

        if (targetMember.getRole() == WorkspaceRole.OWNER) {
            throw new UnauthorizedException("Workspace owner cannot be removed");
        }

        workspaceMemberRepository.delete(targetMember);
    }

    private WorkspaceMember verifyMember(UUID workspaceId, UUID userId) {
        return workspaceMemberRepository.findByWorkspaceIdAndUserId(workspaceId, userId)
                .orElseThrow(() -> new UnauthorizedException("Access denied: You are not a member of this workspace"));
    }
}
