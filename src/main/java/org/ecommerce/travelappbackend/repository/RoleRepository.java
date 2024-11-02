package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long>{
    public boolean existsByRole(String role);
}
