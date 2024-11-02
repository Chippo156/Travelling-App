package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.BookingRequest;
import org.ecommerce.travelappbackend.dtos.response.BookingResponse;
import org.ecommerce.travelappbackend.entity.Bookings;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    Bookings toBooking(BookingRequest bookingRequest);
    BookingResponse toBookingResponse(Bookings bookings);
}
