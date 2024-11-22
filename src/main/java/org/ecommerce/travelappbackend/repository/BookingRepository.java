package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Bookings, Long>{
    @Query("SELECT b FROM Bookings b WHERE b.user.id = :userId and b.bookingStatus != 'CANCELLED'")
    public List<Bookings> findByUserId(Long userId);

    @Query("SELECT b FROM Bookings b WHERE b.user.id = :userId and b.bookingStatus = 'CANCELLED'")
    public List<Bookings> findCancelledBookingsByUserId(Long userId);
}
