package org.ecommerce.travelappbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data

public class User extends BaseEntity{
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private int id;
     private int username;
     private String password;
     private String email;
     private String phone;


     @OneToOne(cascade = CascadeType.ALL)
     @JoinColumn(name = "role_id", referencedColumnName = "role_id")
     private Role role;
}
