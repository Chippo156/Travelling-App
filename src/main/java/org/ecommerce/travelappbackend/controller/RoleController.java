package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.RoleRequest;
import org.ecommerce.travelappbackend.entity.Role;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.services.service.RoleService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    public ApiResponse<Role> createRole(@RequestBody RoleRequest request){
        try{
            return new ApiResponse<>(200,"success",roleService.createRole(request));

        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<Role> getRole(@PathVariable Long id){
        try{
            return new ApiResponse<>(200,"success",roleService.getRole(id));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }
}
