package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Bookings, Long>{
    public List<Bookings> findByUserId(Long userId);
}
