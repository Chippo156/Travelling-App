package org.ecommerce.travelappbackend.repository;

import org.ecommerce.travelappbackend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
     List<Room> findByDestinationId(Long destinationId);
        List<Room> findByRoomType(String roomType);

}
