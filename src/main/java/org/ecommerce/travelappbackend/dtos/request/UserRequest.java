package org.ecommerce.travelappbackend.dtos.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    @NotBlank(message = "Username cannot be empty")
    private String username;
    @NotBlank(message = "Password cannot be empty")
    private String password;
    private String email;
    @NotBlank(message = "Phone cannot be empty")
    private String phone;
    private String address;
    private String sex;
    private LocalDate dob;

    private String informationAgent;

}
