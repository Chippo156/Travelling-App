package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.RoleRequest;
import org.ecommerce.travelappbackend.entity.Role;
import org.ecommerce.travelappbackend.repository.RoleRepository;
import org.ecommerce.travelappbackend.services.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class   RoleServiceImpl implements RoleService {
    private final RoleRepository repository;
    @Override
    public Role createRole(RoleRequest request) {

        if(repository.existsByRole(request.getRole())){
            throw new RuntimeException("Role already exists");
        }
        Role role = new Role();
        role.setRole(request.getRole());
        return repository.save(role);
    }



    @Override
    public Role getRole(Long id) {
        return repository.findById(id).orElseThrow(()->new RuntimeException("Role not found"));
    }


    @Override
    public List<Role> getAllRoles() {
        return repository.findAll();
    }
}
