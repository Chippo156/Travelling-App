package org.ecommerce.travelappbackend.repository;

import org.ecommerce.travelappbackend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
       List<Room> findByDestinationId(Long destinationId);
        List<Room> findByRoomType(String roomType);

       Room findDistinctFirstByDestinationId(Long destinationId);


    @Query("SELECT r FROM Room r WHERE r.destination.id = :destinationId AND " +
            "NOT EXISTS (SELECT 1 FROM Bookings b WHERE b.room.id = r.id AND " +
            "((b.checkInDate <= :endDate AND b.checkOutDate >= :startDate)))")
    List<Room> filterRoomsIsNotBooked(@Param("destinationId") Long destinationId,
                                      @Param("startDate") LocalDate startDate,
                                      @Param("endDate") LocalDate endDate);

}
