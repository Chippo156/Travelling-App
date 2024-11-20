package org.ecommerce.travelappbackend.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class UserResponse {
    Long id;
    String username;
    String email;
    String phone;
    String address;
    String sex;
    LocalDate dob;
    String informationAgent;
    @JsonProperty("role_id")
    Long roleId;
}
