package com.devforge.workspace.dto;

import com.devforge.user.dto.UserDto;
import com.devforge.workspace.entity.WorkspaceRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkspaceMemberDto {
    private UUID id;
    private UUID workspaceId;
    private UserDto user;
    private WorkspaceRole role;
    private LocalDateTime joinedAt;
}
