package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
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

import java.util.List;


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

    @Override
    public List<RoomImage> get(Long roomId) {
        try {
            return roomImageRepository.findAllByRoomId(roomId);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String fakeData() {
        Faker faker = new Faker();
        String[] url = {"http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073183/34ca4de9-4104-4294-8caa-226704b09a9c.avif",
                "http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073270/ad2163fe-7ad8-4125-be2c-1741d32b9c72.webp",
                "http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073301/0c5fa050-338b-46b3-9234-be0eecbcf863.avif"
                , "http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073348/3d050291-6aa1-4c68-a8c8-626d930d79b3.avif",
                "http://res.cloudinary.com/dqnwxejgy/image/upload/v1731073525/1ec58368-4236-4e55-ba44-ee620f78cce5.avif"};
        for (int i = 32; i < 78; i++) {
            RoomImage roomImage = new RoomImage();
            roomImage.setImageUrl(url[faker.number().numberBetween(0, 4)]);
            roomImage.setRoom(roomRepository.findById((long) i).orElseThrow(() -> new RuntimeException("Room not found")));
            roomImageRepository.save(roomImage);
        }
        return "Fake data created";
    }
}
