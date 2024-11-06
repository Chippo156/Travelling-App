package org.ecommerce.travelappbackend.dtos.response;


import com.fasterxml.jackson.annotation.JsonProperty;
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
@Builder

public class BookingResponse {

    @JsonProperty("user_id")
    Long userId;
    @JsonProperty("destination_id")
    Long destinationId;
    @JsonProperty("room_id")
    Long roomId;
    @JsonProperty("booking_time")
    LocalDateTime bookingTime;
    @JsonProperty("booking_status")
    String bookingStatus;
    @JsonProperty("payment_status")
    String paymentStatus;
    @JsonProperty("payment_method")
    String paymentMethod;
    @JsonProperty("payment_date")
    LocalDate paymentDate;
    double amount;
}
