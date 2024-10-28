package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.UserRequest;
import org.ecommerce.travelappbackend.entity.User;
import org.ecommerce.travelappbackend.mapper.UserMapper;
import org.ecommerce.travelappbackend.responses.UserResponse;
import org.ecommerce.travelappbackend.services.impl.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest){
        try{
            return ResponseEntity.ok(mapper.toUserResponse(userService.createUser(userRequest)));
        }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
