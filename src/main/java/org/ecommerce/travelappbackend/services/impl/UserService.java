package org.ecommerce.travelappbackend.services.impl;

import org.ecommerce.travelappbackend.dtos.UserRequest;
import org.ecommerce.travelappbackend.entity.User;

import java.util.Optional;

public interface UserService {
    public User createUser(UserRequest userRequest);
    public Optional<User> getUser(int id);
    public User updateUser(UserRequest userRequest);
    public void deleteUser(int id);
    public Optional<User> getUserByEmail(String email);
    public Optional<User> getUserByUsername(String username);

}
