package com.devforge.user.mapper;

import com.devforge.user.dto.RoleDto;
import com.devforge.user.dto.UserDto;
import com.devforge.user.entity.Permission;
import com.devforge.user.entity.Role;
import com.devforge.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "permissions", source = "permissions", qualifiedByName = "mapPermissionsToStrings")
    RoleDto toRoleDto(Role role);

    @Named("mapPermissionsToStrings")
    default Set<String> mapPermissionsToStrings(Set<Permission> permissions) {
        if (permissions == null) {
            return Set.of();
        }
        return permissions.stream()
                .map(Permission::getName)
                .collect(Collectors.toSet());
    }
}
