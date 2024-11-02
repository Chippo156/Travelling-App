package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.BookingRequest;
import org.ecommerce.travelappbackend.dtos.response.BookingResponse;
import org.ecommerce.travelappbackend.entity.Bookings;
import org.ecommerce.travelappbackend.mapper.BookingMapper;
import org.ecommerce.travelappbackend.repository.BookingRepository;
import org.ecommerce.travelappbackend.services.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;

    private final BookingMapper bookingMapper;

    @Override
    public BookingResponse createBooking(BookingRequest bookingRequest) throws Exception {
        try{
            Bookings bookings = bookingMapper.toBooking(bookingRequest);
            bookings.setBookingTime(LocalDateTime.now());
            if(bookingRequest.getPaymentStatus().equals("NO_PAID")){
                bookings.setPaymentDate(null);
            }else if(bookingRequest.getPaymentStatus().equals("PAID")){
                bookings.setPaymentDate(LocalDate.now());
            }
            bookings = bookingRepository.save(bookings);
            return bookingMapper.toBookingResponse(bookings);
        }catch (Exception ex){
            throw new Exception(ex.getMessage());
        }
    }

    @Override
    public BookingResponse getBooking(Long id) {
        return bookingMapper.toBookingResponse(bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found")));
    }

    @Override
    public BookingResponse updateBooking(Long id, BookingRequest bookingRequest) {
        try{
            Bookings bookings = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));
            bookings = bookingMapper.toBooking(bookingRequest);
            bookings.setId(id);
            if(bookingRequest.getPaymentStatus().equals("NO_PAID")){
                bookings.setPaymentDate(null);
            }else if(bookingRequest.getPaymentStatus().equals("PAID")){
                bookings.setPaymentDate(LocalDate.now());
            }
            bookings = bookingRepository.save(bookings);
            return bookingMapper.toBookingResponse(bookings);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public boolean deleteBooking(Long id) {
        try{
            bookingRepository.deleteById(id);
            return true;
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(bookingMapper::toBookingResponse).toList();
    }

    @Override
    public List<BookingResponse> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream().map(bookingMapper::toBookingResponse).toList();
    }
}
