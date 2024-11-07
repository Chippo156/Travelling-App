package org.ecommerce.travelappbackend.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.ecommerce.travelappbackend.entity.User;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IntrospectResponse {

    @JsonProperty("user")
    UserResponse userResponse;
    boolean valid;
}
