package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.BookingRequest;
import org.ecommerce.travelappbackend.dtos.response.BookingResponse;

import java.util.List;

public interface BookingService {
     BookingResponse createBooking(BookingRequest bookingRequest) throws Exception;

     BookingResponse getBooking(Long id);

     BookingResponse updateBooking(Long id, BookingRequest bookingRequest);

     boolean deleteBooking(Long id);

     List<BookingResponse> getAllBookings();

     List<BookingResponse> getBookingsByUserId(Long userId);


}
