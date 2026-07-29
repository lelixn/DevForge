package com.devforge.workspace.controller;

import com.devforge.common.response.ApiResponse;
import com.devforge.security.SecurityUtils;
import com.devforge.workspace.dto.AcceptInviteRequest;
import com.devforge.workspace.dto.CreateWorkspaceRequest;
import com.devforge.workspace.dto.InviteMemberRequest;
import com.devforge.workspace.dto.UpdateWorkspaceRequest;
import com.devforge.workspace.dto.WorkspaceDto;
import com.devforge.workspace.dto.WorkspaceMemberDto;
import com.devforge.workspace.service.WorkspaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Tag(name = "Workspace Management", description = "Endpoints for managing workspaces, member access roles, and team invitations")
@RestController
@RequestMapping("/api/v1/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @Operation(summary = "Create a new workspace")
    @PostMapping
    public ResponseEntity<ApiResponse<WorkspaceDto>> createWorkspace(@Valid @RequestBody CreateWorkspaceRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        WorkspaceDto workspace = workspaceService.createWorkspace(currentUserId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Workspace created successfully", workspace));
    }

    @Operation(summary = "Get workspace details by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<WorkspaceDto>> getWorkspaceById(@PathVariable UUID id) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        WorkspaceDto workspace = workspaceService.getWorkspaceById(id, currentUserId);
        return ResponseEntity.ok(ApiResponse.success(workspace));
    }

    @Operation(summary = "Get all workspaces for current user")
    @GetMapping
    public ResponseEntity<ApiResponse<List<WorkspaceDto>>> getUserWorkspaces() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        List<WorkspaceDto> workspaces = workspaceService.getUserWorkspaces(currentUserId);
        return ResponseEntity.ok(ApiResponse.success(workspaces));
    }

    @Operation(summary = "Update workspace details")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<WorkspaceDto>> updateWorkspace(@PathVariable UUID id,
                                                                      @Valid @RequestBody UpdateWorkspaceRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        WorkspaceDto workspace = workspaceService.updateWorkspace(id, currentUserId, request);
        return ResponseEntity.ok(ApiResponse.success("Workspace updated successfully", workspace));
    }

    @Operation(summary = "Delete workspace (Owner only)")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteWorkspace(@PathVariable UUID id) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        workspaceService.deleteWorkspace(id, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Workspace deleted successfully", null));
    }

    @Operation(summary = "Invite team member to workspace")
    @PostMapping("/{id}/invite")
    public ResponseEntity<ApiResponse<WorkspaceMemberDto>> inviteMember(@PathVariable UUID id,
                                                                          @Valid @RequestBody InviteMemberRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        WorkspaceMemberDto member = workspaceService.inviteMember(id, currentUserId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Member invited successfully", member));
    }

    @Operation(summary = "Accept workspace invitation")
    @PostMapping("/invites/accept")
    public ResponseEntity<ApiResponse<WorkspaceMemberDto>> acceptInvite(@Valid @RequestBody AcceptInviteRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        WorkspaceMemberDto member = workspaceService.acceptInvite(currentUserId, request);
        return ResponseEntity.ok(ApiResponse.success("Workspace invitation accepted", member));
    }

    @Operation(summary = "Get all members of a workspace")
    @GetMapping("/{id}/members")
    public ResponseEntity<ApiResponse<List<WorkspaceMemberDto>>> getWorkspaceMembers(@PathVariable UUID id) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        List<WorkspaceMemberDto> members = workspaceService.getWorkspaceMembers(id, currentUserId);
        return ResponseEntity.ok(ApiResponse.success(members));
    }

    @Operation(summary = "Remove member from workspace")
    @DeleteMapping("/{id}/members/{memberId}")
    public ResponseEntity<ApiResponse<Void>> removeMember(@PathVariable UUID id,
                                                           @PathVariable UUID memberId) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        workspaceService.removeMember(id, currentUserId, memberId);
        return ResponseEntity.ok(ApiResponse.success("Member removed from workspace", null));
    }
}
