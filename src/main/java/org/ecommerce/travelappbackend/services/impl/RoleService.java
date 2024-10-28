package org.ecommerce.travelappbackend.services.impl;

import org.ecommerce.travelappbackend.dtos.RoleRequest;
import org.ecommerce.travelappbackend.entity.Role;

import java.util.List;

public interface RoleService {

    public Role createRole(RoleRequest role);
    public Role updateRole(RoleRequest role);
    public Role getRole(int id);
    public void deleteRole(int id);
    public List<Role> getAllRoles();


}
