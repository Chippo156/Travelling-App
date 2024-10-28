package org.ecommerce.travelappbackend.services;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.UserRequest;
import org.ecommerce.travelappbackend.entity.Role;
import org.ecommerce.travelappbackend.entity.User;
import org.ecommerce.travelappbackend.mapper.UserMapper;
import org.ecommerce.travelappbackend.repository.RoleRepository;
import org.ecommerce.travelappbackend.repository.UserRepository;
import org.ecommerce.travelappbackend.services.impl.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper mapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public User createUser(UserRequest userRequest) {
        if(userRepository.existsByUsername(userRequest.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        User user = mapper.toUser(userRequest);
        user.setPassword(userRequest.getPassword());
        List<Role> getRoles = roleRepository.findAll();
        user.setRole(getRoles.get(1));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUser(int id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(UserRequest userRequest) {
        return null;
    }


    @Override
    public void deleteUser(int id) {

    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return Optional.empty();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return Optional.empty();
    }
}
