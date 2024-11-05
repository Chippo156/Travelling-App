package org.ecommerce.travelappbackend.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Builder
public class DestinationImageRequest {
    @JsonProperty("destination_id")
    Long destinationId;
    @JsonProperty("image_url")
    @Size(min = 5,max = 200,message = "Image URL must be between 5 and 200 characters")
    String imageUrl;
}
