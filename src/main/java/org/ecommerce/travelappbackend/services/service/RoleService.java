package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.RoleRequest;
import org.ecommerce.travelappbackend.entity.Role;

import java.util.List;

public interface RoleService {

     Role createRole(RoleRequest role);
     Role getRole(Long id);
     List<Role> getAllRoles();


}
