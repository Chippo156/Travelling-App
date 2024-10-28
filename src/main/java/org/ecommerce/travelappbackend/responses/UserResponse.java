package org.ecommerce.travelappbackend.responses;

import lombok.*;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String username;
    private String email;
    private String phone;
}
