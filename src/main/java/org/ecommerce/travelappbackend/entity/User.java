package org.ecommerce.travelappbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User extends BaseEntity {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;private String email;
    private String phone;
    private String address;
    private String sex;
    private LocalDate dob;
    @Column(name = "information_agent")
    private String informationAgent;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

}
