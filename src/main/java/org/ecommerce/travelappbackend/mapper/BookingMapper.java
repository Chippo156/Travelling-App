package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.BookingRequest;
import org.ecommerce.travelappbackend.dtos.response.BookingResponse;
import org.ecommerce.travelappbackend.entity.Bookings;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    Bookings toBooking(BookingRequest bookingRequest);
    @Mappings({
            @org.mapstruct.Mapping(target = "userId", source = "bookings.user.id"),
            @org.mapstruct.Mapping(target = "destinationId", source = "bookings.destination.id"),
            @org.mapstruct.Mapping(target = "roomId", source = "bookings.room.id")
    })
    BookingRequest toBookingRequest(Bookings bookings);

    @Mappings({
            @org.mapstruct.Mapping(target = "userId", source = "bookings.user.id"),
            @org.mapstruct.Mapping(target = "destinationId", source = "bookings.destination.id"),
            @org.mapstruct.Mapping(target = "roomId", source = "bookings.room.id")
    })
    BookingResponse toBookingResponse(Bookings bookings);
}
