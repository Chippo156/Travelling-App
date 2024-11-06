package org.ecommerce.travelappbackend.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.ecommerce.travelappbackend.entity.Destination;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
public class PopularAmenityRequest {
    @JsonProperty("amenity_name")
    private String amenityName;
    @JsonProperty("amenity_icon")
    private String amenityIcon;
}
