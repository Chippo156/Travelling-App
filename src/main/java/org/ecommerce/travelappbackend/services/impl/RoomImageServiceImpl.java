package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.DestinationImageRequest;
import org.ecommerce.travelappbackend.dtos.request.RoomImageRequest;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.DestinationImage;
import org.ecommerce.travelappbackend.entity.Room;
import org.ecommerce.travelappbackend.entity.RoomImage;
import org.ecommerce.travelappbackend.repository.DestinationImageRepository;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.repository.RoomImageRepository;
import org.ecommerce.travelappbackend.repository.RoomRepository;
import org.ecommerce.travelappbackend.services.service.DestinationImageService;
import org.ecommerce.travelappbackend.services.service.RoomImageService;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RoomImageServiceImpl implements RoomImageService {

    private final RoomImageRepository roomImageRepository;
    private final RoomRepository roomRepository;


    @Override
    public RoomImage uploadImage(Long roomId, RoomImageRequest request) {

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
            RoomImage roomImage = new RoomImage();
            roomImage.setRoom(room);
            roomImage.setImageUrl(request.getImageUrl());
            int size = roomImageRepository.findAllByRoomId(roomId).size();
            if (size >= 7) {
                throw new RuntimeException("You can't upload more than 7 images");
            } else {
                return roomImageRepository.save(roomImage);
            }

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }


    }
}
