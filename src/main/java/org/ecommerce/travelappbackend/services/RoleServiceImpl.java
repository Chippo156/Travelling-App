package org.ecommerce.travelappbackend.services;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.RoleRequest;
import org.ecommerce.travelappbackend.entity.Role;
import org.ecommerce.travelappbackend.repository.RoleRepository;
import org.ecommerce.travelappbackend.services.impl.RoleService;
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
    public Role updateRole(RoleRequest role) {
        return null;
    }

    @Override
    public Role getRole(int id) {
        return repository.findById(id).orElseThrow(()->new RuntimeException("Role not found"));
    }

    @Override
    public void deleteRole(int id) {

    }

    @Override
    public List<Role> getAllRoles() {
        return null;
    }
}
