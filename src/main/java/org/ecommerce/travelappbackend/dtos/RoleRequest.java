package org.ecommerce.travelappbackend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleRequest {
    @NotBlank(message = "Role cannot be empty")
    private String role;
}
