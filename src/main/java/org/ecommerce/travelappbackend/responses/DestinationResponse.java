package org.ecommerce.travelappbackend.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
public class DestinationResponse {
    String name;
    String description;
    String location;
    double averageRating;
    String imageUrl;
    double price;
}
