package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.PopularAmenityRequest;
import org.ecommerce.travelappbackend.dtos.response.PopularAmenityResponse;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.PopularAmenity;
import org.ecommerce.travelappbackend.mapper.PopularAmenityMapper;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.repository.PopularAmenityRepository;
import org.ecommerce.travelappbackend.services.service.DestinationService;
import org.ecommerce.travelappbackend.services.service.PopularAmenityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PopularAmenityServiceImpl implements PopularAmenityService {

    private final PopularAmenityRepository popularAmenityRepository;
    private final PopularAmenityMapper popularAmenityMapper;
    private final DestinationRepository destinationRepository;
    @Override
    public PopularAmenityResponse createPopularAmenity(PopularAmenityRequest popularAmenityRequest) {
        try{
           Destination destination= destinationRepository.findById(popularAmenityRequest.getDestinationId())
                    .orElseThrow(()->new RuntimeException("Destination not found"));
            PopularAmenity popularAmenity = popularAmenityMapper.popularAmenityRequestToPopularAmenity(popularAmenityRequest);
            popularAmenity.setDestination(destination);
            return popularAmenityMapper.popularAmenityToPopularAmenityResponse(popularAmenityRepository.save(popularAmenity));

        }catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public PopularAmenityResponse getPopularAmenity(Long id) {
        return popularAmenityRepository.findById(id).map(popularAmenityMapper::popularAmenityToPopularAmenityResponse)
                .orElseThrow(()->new RuntimeException("Popular Amenity not found"));
    }

    @Override
    public List<PopularAmenityResponse> getAllPopularAmenities() {
        try{
          return popularAmenityRepository.findAll().stream().map(popularAmenityMapper::popularAmenityToPopularAmenityResponse).toList();
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
