package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.UserRequest;
import org.ecommerce.travelappbackend.entity.User;
import org.ecommerce.travelappbackend.responses.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
   User toUser(UserRequest userRequest);

   UserResponse toUserResponse(User user);

}
