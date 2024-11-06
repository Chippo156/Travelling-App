package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.DestinationAmenityRequest;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.DestinationAmenity;
import org.ecommerce.travelappbackend.entity.PopularAmenity;
import org.ecommerce.travelappbackend.repository.DestinationAmenityRepository;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.repository.PopularAmenityRepository;
import org.ecommerce.travelappbackend.services.service.DestinationAmenityService;
import org.springframework.stereotype.Service;

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
}
