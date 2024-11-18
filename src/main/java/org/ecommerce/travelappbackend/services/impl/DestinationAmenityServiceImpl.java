package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.ecommerce.travelappbackend.dtos.request.DestinationAmenityRequest;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.DestinationAmenity;
import org.ecommerce.travelappbackend.entity.PopularAmenity;
import org.ecommerce.travelappbackend.repository.DestinationAmenityRepository;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.repository.PopularAmenityRepository;
import org.ecommerce.travelappbackend.services.service.DestinationAmenityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class DestinationAmenityServiceImpl implements DestinationAmenityService {

    private final DestinationAmenityRepository destinationAmenityRepository;
    private final DestinationRepository destinationRepository;
    private final PopularAmenityRepository popularAmenityRepository;


    @Override
    public DestinationAmenity saveDestinationAmenity(DestinationAmenityRequest request) {
        try{
            DestinationAmenity destinationAmenity = new DestinationAmenity();
            Destination destination = destinationRepository.findById(request.getDestinationId()).orElseThrow(()->new RuntimeException("Destination not found"));
            PopularAmenity popularAmenity = popularAmenityRepository.findById(request.getAmenityId()).orElseThrow(()->new RuntimeException("Amenity not found"));
            destinationAmenity.setDestination(destination);
            destinationAmenity.setAmenity(popularAmenity);
            return destinationAmenityRepository.save(destinationAmenity);
        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public DestinationAmenity getDestinationAmenity(Long destinationId, Long amenityId) {
        return null;
    }

    @Override
    public List<DestinationAmenity> getDestinationAmenities(Long destinationId) {
        try{
            return destinationAmenityRepository.findByDestinationId(destinationId);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String fakeData() {
        Faker faker = new Faker();

        for (int i = 13; i < 28; i++) {
            // Lấy Destination theo ID
            Destination destination = destinationRepository.findById((long) i)
                    .orElseThrow(() -> new RuntimeException("Destination not found"));

            for (int j = 1; j <= 5; j++) {
                // Lấy PopularAmenity theo ID
                PopularAmenity popularAmenity = popularAmenityRepository.findById((long) j)
                        .orElseThrow(() -> new RuntimeException("Amenity not found"));

                // Kiểm tra xem DestinationAmenity đã tồn tại chưa
                boolean exists = destinationAmenityRepository.existsByDestinationAndAmenity(destination, popularAmenity);
                if (!exists) {
                    DestinationAmenity destinationAmenity = new DestinationAmenity();
                    destinationAmenity.setDestination(destination);
                    destinationAmenity.setAmenity(popularAmenity);
                    destinationAmenityRepository.save(destinationAmenity);
                }
            }
        }
        return "Data inserted successfully";
    }

}
