package org.ecommerce.travelappbackend.repository;

import org.ecommerce.travelappbackend.entity.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomImageRepository extends JpaRepository<RoomImage, Long> {
    List<RoomImage> findAllByRoomId(Long roomId);
}
