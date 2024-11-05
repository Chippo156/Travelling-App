package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.UserRequest;
import org.ecommerce.travelappbackend.mapper.UserMapper;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.dtos.response.UserResponse;
import org.ecommerce.travelappbackend.services.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/users")
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;
    @PostMapping("/registration")
    public ApiResponse<UserResponse> createUser(@RequestBody UserRequest userRequest){
        try{
            return new ApiResponse<>(200,"success",mapper.toUserResponse(userService.createUser(userRequest)));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }


}
