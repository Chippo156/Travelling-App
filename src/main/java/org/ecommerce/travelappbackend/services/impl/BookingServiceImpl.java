package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.BookingRequest;
import org.ecommerce.travelappbackend.dtos.response.BookingResponse;
import org.ecommerce.travelappbackend.entity.Bookings;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.Room;
import org.ecommerce.travelappbackend.entity.User;
import org.ecommerce.travelappbackend.mapper.BookingMapper;
import org.ecommerce.travelappbackend.repository.BookingRepository;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.repository.RoomRepository;
import org.ecommerce.travelappbackend.repository.UserRepository;
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
    private  final DestinationRepository destinationRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    @Override
    public BookingResponse createBooking(BookingRequest bookingRequest) throws Exception {
        try{
            User user = userRepository.findById(bookingRequest.getUserId()).orElseThrow(()->new RuntimeException("User not found"));
            Destination destination = destinationRepository.findById(bookingRequest.getDestinationId()).orElseThrow(()->new RuntimeException("Destination not found"));
            Room room = roomRepository.findById(bookingRequest.getRoomId()).orElseThrow(()->new RuntimeException("Room not found"));
            Bookings bookings = bookingMapper.toBooking(bookingRequest);
            bookings.setDestination(destination);
            bookings.setRoom(room);
            bookings.setUser(user);
            if(bookingRequest.getPaymentStatus().equals("NO_PAID")){
                bookings.setPaymentDate(null);
            }else if(bookingRequest.getPaymentStatus().equals("PAID")){
                bookings.setPaymentDate(LocalDate.now());
            }
            bookings.setBookingStatus("BOOKED");
            room.setQuantity(room.getQuantity()-bookingRequest.getQuantity());
            roomRepository.save(room);
            bookings.setQuantity(bookingRequest.getQuantity());
            bookings = bookingRepository.save(bookings);
            return bookingMapper.toBookingResponse(bookings);
        }catch (Exception ex){
            throw new Exception(ex.getMessage());
        }
    }

    @Override
    public Bookings getBooking(Long id) {
        return bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));
    }

    @Override
    public BookingResponse updateBooking(Long id, BookingRequest bookingRequest) {
        try{
            Bookings bookings = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));

            if(bookingRequest.getCheckInDate()!=null){
                bookings.setCheckInDate(bookingRequest.getCheckInDate());
            }
            if(bookingRequest.getCheckOutDate()!=null){
                bookings.setCheckOutDate(bookingRequest.getCheckOutDate());
            }
            if(bookingRequest.getPaymentMethod()!=null){
                bookings.setPaymentMethod(bookingRequest.getPaymentMethod());
            }
            if(bookingRequest.getAmount()!=0){
                bookings.setAmount(bookingRequest.getAmount());
            }
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
            Bookings bookings = bookingRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));
            bookings.setBookingStatus("CANCELLED");
            Room room = roomRepository.findById(bookings.getRoom().getId()).orElseThrow(()->new RuntimeException("Room not found"));
            room.setQuantity(room.getQuantity()+bookings.getQuantity());
            roomRepository.save(room);
            bookingRepository.save(bookings);
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
