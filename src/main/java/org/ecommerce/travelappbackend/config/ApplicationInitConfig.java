package org.ecommerce.travelappbackend.config;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.ecommerce.travelappbackend.entity.Role;
import org.ecommerce.travelappbackend.entity.User;
import org.ecommerce.travelappbackend.enums.RoleEnum;
import org.ecommerce.travelappbackend.repository.RoleRepository;
import org.ecommerce.travelappbackend.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;



@Configuration
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Slf4j
public class ApplicationInitConfig {


     PasswordEncoder passwordEncoder;
//     @Bean
//    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository){
//        return args -> {
//            if (userRepository.findByUsername("admin").isEmpty()) {
//                Role role = roleRepository.findById(1L).orElseThrow(()->new RuntimeException("Role not found"));
//
//                User user = User.builder()
//                        .username("admin")
//                        .password(passwordEncoder.encode("admin"))
//                        .role(role)
//                        .build();
//                userRepository.save(user);
//
//                log.warn("Admin user created with default password: admin");
//            }
//        };
//    }


}
