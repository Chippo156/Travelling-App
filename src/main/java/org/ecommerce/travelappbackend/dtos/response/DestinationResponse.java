package org.ecommerce.travelappbackend.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.ecommerce.travelappbackend.entity.PopularAmenity;

import java.util.List;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Builder

public class DestinationResponse {
    @JsonProperty("destination_id")
    Long id;
    String name;
    String description;
    String location;
    @JsonProperty("average_rating")
    double averageRating;
    @JsonProperty("image_url")
    String imageUrl;
}
