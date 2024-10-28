package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
     boolean existsByUsername(String username);

}
