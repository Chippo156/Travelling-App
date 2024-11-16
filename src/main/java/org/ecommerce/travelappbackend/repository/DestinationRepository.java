package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.Destination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface DestinationRepository extends JpaRepository<Destination, Long>{
    List<Destination> findByCategoryId(Long category_id);
    @Query("SELECT DISTINCT d FROM Destination d JOIN Room r on d.id=r.destination.id JOIN DestinationAmenity da on da.destination.id=d.id WHERE " +
            "(:categoryId IS NULL OR d.category.id = :categoryId) AND " +
            "(:averageRating IS NULL OR d.averageRating = :averageRating) AND " +
            "(:price IS NULL OR r.price <= :price) AND " +
            "(:amenityId IS NULL OR da.amenity.id = :amenityId) AND " +
            "(:location IS NULL OR REPLACE(REPLACE(d.location, ' ', ''), '[^\\p{IsAlphabetic}\\p{IsDigit}]', '') LIKE %:location%) AND " +
            "(:sleeps IS NULL OR r.sleeps >= :sleeps) AND " +
            "(:startDate IS NULL OR :endDate IS NULL OR " +
            "NOT EXISTS (SELECT 1 FROM Bookings b WHERE b.room.id = r.id AND " +
            "((b.checkInDate <= :endDate AND b.checkOutDate >= :startDate))))")
    List<Destination> filterDestination(@Param("categoryId") Long id,
                                        @Param("averageRating") Double averageRating,
                                        @Param("price") Double price,
                                        @Param("amenityId") Long amenityId,
                                        @Param("location") String location,
                                        @Param("sleeps") Integer sleeps,
                                        @Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate);


    List<Destination> findByLocationContaining(String location);

    @Query("SELECT d FROM Destination d JOIN Room r on d.id=r.destination.id WHERE " +
            "(:startDate IS NULL OR :endDate IS NULL OR " +
            "NOT EXISTS (SELECT 1 FROM Bookings b WHERE b.room.id = r.id AND " +
            "((b.checkInDate <= :endDate AND b.checkOutDate >= :startDate))))")
    List<Destination> findAvailableDestinations(@Param("startDate") LocalDate startDate,
                                                @Param("endDate") LocalDate endDate);


    @Query("SELECT d FROM Destination d WHERE d.location LIKE %:search% OR d.name LIKE %:search% OR d.description LIKE %:search%")
    List<Destination> searchDestination(@Param("search") String search);





}
