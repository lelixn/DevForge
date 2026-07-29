package com.devforge.workspace.mapper;

import com.devforge.user.mapper.UserMapper;
import com.devforge.workspace.dto.WorkspaceDto;
import com.devforge.workspace.dto.WorkspaceMemberDto;
import com.devforge.workspace.entity.Workspace;
import com.devforge.workspace.entity.WorkspaceMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface WorkspaceMapper {

    WorkspaceDto toWorkspaceDto(Workspace workspace);

    @Mapping(target = "workspaceId", source = "workspace.id")
    WorkspaceMemberDto toWorkspaceMemberDto(WorkspaceMember member);

    List<WorkspaceDto> toWorkspaceDtoList(List<Workspace> workspaces);

    List<WorkspaceMemberDto> toWorkspaceMemberDtoList(List<WorkspaceMember> members);
}
