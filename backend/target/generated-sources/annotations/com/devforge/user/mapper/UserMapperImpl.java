package com.devforge.user.mapper;

import com.devforge.user.dto.RoleDto;
import com.devforge.user.dto.UserDto;
import com.devforge.user.entity.Role;
import com.devforge.user.entity.User;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-29T18:09:34+0530",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.100.v20260624-0231, environment: Java 21.0.11 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.avatarUrl( user.getAvatarUrl() );
        userDto.createdAt( user.getCreatedAt() );
        userDto.email( user.getEmail() );
        userDto.emailVerified( user.isEmailVerified() );
        userDto.enabled( user.isEnabled() );
        userDto.fullName( user.getFullName() );
        userDto.id( user.getId() );
        userDto.lastLoginAt( user.getLastLoginAt() );
        userDto.roles( roleSetToRoleDtoSet( user.getRoles() ) );

        return userDto.build();
    }

    @Override
    public RoleDto toRoleDto(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleDto.RoleDtoBuilder roleDto = RoleDto.builder();

        roleDto.permissions( mapPermissionsToStrings( role.getPermissions() ) );
        roleDto.description( role.getDescription() );
        roleDto.id( role.getId() );
        roleDto.name( role.getName() );

        return roleDto.build();
    }

    protected Set<RoleDto> roleSetToRoleDtoSet(Set<Role> set) {
        if ( set == null ) {
            return null;
        }

        Set<RoleDto> set1 = new LinkedHashSet<RoleDto>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Role role : set ) {
            set1.add( toRoleDto( role ) );
        }

        return set1;
    }
}
