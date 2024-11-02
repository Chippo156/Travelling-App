package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.UserRequest;
import org.ecommerce.travelappbackend.entity.User;
import org.ecommerce.travelappbackend.dtos.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
   User toUser(UserRequest userRequest);

   @Mapping(target = "roleId", source = "user.role.id")
   UserResponse toUserResponse(User user);

}
