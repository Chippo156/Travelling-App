package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.RoomRequest;
import org.ecommerce.travelappbackend.dtos.response.RoomResponse;
import org.ecommerce.travelappbackend.entity.Room;

import java.time.LocalDate;
import java.util.List;

public interface RoomService {
    List<RoomResponse> getAllRooms();

    RoomResponse getRoomById(Long id);

    RoomResponse saveRoom(RoomRequest roomRequest);

    RoomResponse updateRoom(Long id, RoomRequest roomRequest);

    void deleteRoom(Long id);

    List<RoomResponse> getRoomsByDestinationId(Long destinationId);

    List<RoomResponse> getRoomsByRoomType(String roomType);

    void updateImage(Long id, String imageUrl);

    RoomResponse findDistinctFirstByDestinationId(Long destinationId);

    List<RoomResponse> filterRoomsIsNotBooked(Long destinationId, LocalDate startDate, LocalDate endDate);

    List<RoomResponse> findAvailableRooms(Long destinationId, Integer sleeps, LocalDate startDate, LocalDate endDate, Integer quantity);

     String fakeData();
}
