package org.ecommerce.travelappbackend.dtos.response;

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
    Long id;
    String name;
    String description;
    String location;
    double averageRating;
    String imageUrl;
    double price;
    List<PopularAmenity> popularAmenities;
}
