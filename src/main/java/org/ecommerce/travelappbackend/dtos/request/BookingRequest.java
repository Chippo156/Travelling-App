package org.ecommerce.travelappbackend.dtos.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
public class BookingRequest {
    @JsonProperty("user_id")
    Long userId;
    @JsonProperty("destination_id")
    Long destinationId;
    @JsonProperty("room_id")
    Long roomId;
    @JsonProperty("payment_status")
    String paymentStatus;
    @JsonProperty("payment_method")
    String paymentMethod;
    double amount;
}
