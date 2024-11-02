package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.RoomRequest;
import org.ecommerce.travelappbackend.dtos.response.RoomResponse;
import org.ecommerce.travelappbackend.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    Room toRoom(RoomRequest roomRequest);
    @Mapping(target = "destinationId", source = "room.destination.id")
    RoomResponse toRoomResponse(Room room);
}
