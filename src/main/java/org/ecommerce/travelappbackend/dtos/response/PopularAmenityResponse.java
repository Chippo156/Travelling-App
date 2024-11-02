package org.ecommerce.travelappbackend.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Builder
public class PopularAmenityResponse {
    @JsonProperty("amenity_name")
    String amenityName;
    @JsonProperty("amenity_icon")
    String amenityIcon;
    @JsonProperty("destination_id")
    Long destinationId;
}
