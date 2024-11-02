package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.RoomRequest;
import org.ecommerce.travelappbackend.dtos.response.RoomResponse;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.Room;
import org.ecommerce.travelappbackend.mapper.RoomMapper;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.repository.RoomRepository;
import org.ecommerce.travelappbackend.services.service.RoomService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final DestinationRepository destinationRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream().map(roomMapper::toRoomResponse).toList();
    }

    @Override
    public RoomResponse getRoomById(Long id) {
        return roomRepository.findById(id).map(roomMapper::toRoomResponse).orElseThrow(() -> new RuntimeException("Room not found"));

    }

    @Override
    public RoomResponse saveRoom(RoomRequest roomRequest) {
        try{
            Destination destination = destinationRepository.findById(roomRequest.getDestinationId()).orElseThrow(()->new RuntimeException("Destination not found"));
            Room room = roomMapper.toRoom(roomRequest);
            room.setDestination(destination);
            return roomMapper.toRoomResponse(roomRepository.save(room));
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public RoomResponse updateRoom(Long id,RoomRequest roomRequest) {
        try{
            Room room = roomRepository.findById(id).orElseThrow(()->new RuntimeException("Room not found"));
            if(roomRequest.getRoomType()!=null)
                room.setRoomType(roomRequest.getRoomType());
            if(roomRequest.getDescription()!=null)
                room.setDescription(roomRequest.getDescription());
            if(roomRequest.getBeds()!=null)
                room.setBeds(roomRequest.getBeds());
            if(roomRequest.getPrice()!=0)
                room.setPrice(roomRequest.getPrice());
            if(roomRequest.getSleeps()!=0)
                room.setSleeps(roomRequest.getSleeps());
            if(roomRequest.getFeatures()!=null)
                room.setFeatures(roomRequest.getFeatures());
            return roomMapper.toRoomResponse(roomRepository.save(room));
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteRoom(Long id) {
        try{
            roomRepository.deleteById(id);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public List<RoomResponse> getRoomsByDestinationId(Long destinationId) {
        return roomRepository.findByDestinationId(destinationId).stream().map(roomMapper::toRoomResponse).toList();
    }

    @Override
    public List<RoomResponse> getRoomsByRoomType(String roomType) {
        return roomRepository.findByRoomType(roomType).stream().map(roomMapper::toRoomResponse).toList();
    }
}
