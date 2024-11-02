package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
     boolean existsByUsername(String username);
        Optional<User> findByUsername(String username);
        User findByPhone(String phone);
        User findByEmail(String email);


}
