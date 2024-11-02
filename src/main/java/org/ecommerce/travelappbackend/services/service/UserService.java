package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.UserRequest;
import org.ecommerce.travelappbackend.entity.User;

import java.util.Optional;

public interface UserService {
     User createUser(UserRequest userRequest);
     Optional<User> getUser(Long id);
     User updateUser(UserRequest userRequest);
     void deleteUser(Long id);
     Optional<User> getUserByEmail(String email);
     User getUserByUsername(String username);

}
