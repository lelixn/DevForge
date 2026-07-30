package com.devforge.workspace.mapper;

import com.devforge.user.mapper.UserMapper;
import com.devforge.workspace.dto.WorkspaceDto;
import com.devforge.workspace.dto.WorkspaceMemberDto;
import com.devforge.workspace.entity.Workspace;
import com.devforge.workspace.entity.WorkspaceMember;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-29T18:09:33+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class WorkspaceMapperImpl implements WorkspaceMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public WorkspaceDto toWorkspaceDto(Workspace workspace) {
        if ( workspace == null ) {
            return null;
        }

        WorkspaceDto.WorkspaceDtoBuilder workspaceDto = WorkspaceDto.builder();

        workspaceDto.createdAt( workspace.getCreatedAt() );
        workspaceDto.description( workspace.getDescription() );
        workspaceDto.id( workspace.getId() );
        workspaceDto.members( workspaceMemberSetToWorkspaceMemberDtoList( workspace.getMembers() ) );
        workspaceDto.name( workspace.getName() );
        workspaceDto.owner( userMapper.toUserDto( workspace.getOwner() ) );
        workspaceDto.slug( workspace.getSlug() );
        workspaceDto.updatedAt( workspace.getUpdatedAt() );

        return workspaceDto.build();
    }

    @Override
    public WorkspaceMemberDto toWorkspaceMemberDto(WorkspaceMember member) {
        if ( member == null ) {
            return null;
        }

        WorkspaceMemberDto.WorkspaceMemberDtoBuilder workspaceMemberDto = WorkspaceMemberDto.builder();

        workspaceMemberDto.workspaceId( memberWorkspaceId( member ) );
        workspaceMemberDto.id( member.getId() );
        workspaceMemberDto.joinedAt( member.getJoinedAt() );
        workspaceMemberDto.role( member.getRole() );
        workspaceMemberDto.user( userMapper.toUserDto( member.getUser() ) );

        return workspaceMemberDto.build();
    }

    @Override
    public List<WorkspaceDto> toWorkspaceDtoList(List<Workspace> workspaces) {
        if ( workspaces == null ) {
            return null;
        }

        List<WorkspaceDto> list = new ArrayList<WorkspaceDto>( workspaces.size() );
        for ( Workspace workspace : workspaces ) {
            list.add( toWorkspaceDto( workspace ) );
        }

        return list;
    }

    @Override
    public List<WorkspaceMemberDto> toWorkspaceMemberDtoList(List<WorkspaceMember> members) {
        if ( members == null ) {
            return null;
        }

        List<WorkspaceMemberDto> list = new ArrayList<WorkspaceMemberDto>( members.size() );
        for ( WorkspaceMember workspaceMember : members ) {
            list.add( toWorkspaceMemberDto( workspaceMember ) );
        }

        return list;
    }

    protected List<WorkspaceMemberDto> workspaceMemberSetToWorkspaceMemberDtoList(Set<WorkspaceMember> set) {
        if ( set == null ) {
            return null;
        }

        List<WorkspaceMemberDto> list = new ArrayList<WorkspaceMemberDto>( set.size() );
        for ( WorkspaceMember workspaceMember : set ) {
            list.add( toWorkspaceMemberDto( workspaceMember ) );
        }

        return list;
    }

    private UUID memberWorkspaceId(WorkspaceMember workspaceMember) {
        if ( workspaceMember == null ) {
            return null;
        }
        Workspace workspace = workspaceMember.getWorkspace();
        if ( workspace == null ) {
            return null;
        }
        UUID id = workspace.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
