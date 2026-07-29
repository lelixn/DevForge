package com.devforge.workspace.dto;

import com.devforge.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkspaceDto {
    private UUID id;
    private String name;
    private String slug;
    private String description;
    private UserDto owner;
    private List<WorkspaceMemberDto> members;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
