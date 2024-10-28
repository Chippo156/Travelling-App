package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.RoleRequest;
import org.ecommerce.travelappbackend.entity.Role;
import org.ecommerce.travelappbackend.services.impl.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    public ResponseEntity<Role> createRole(@RequestBody RoleRequest request){
        return ResponseEntity.ok(roleService.createRole(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getRole(@PathVariable int id){
        return ResponseEntity.ok(roleService.getRole(id));
    }


}
