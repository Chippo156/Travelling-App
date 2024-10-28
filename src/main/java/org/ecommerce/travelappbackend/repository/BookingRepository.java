package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Bookings, Integer>{
}
