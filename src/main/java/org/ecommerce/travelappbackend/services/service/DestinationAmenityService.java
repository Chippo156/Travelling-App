package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.DestinationAmenityRequest;
import org.ecommerce.travelappbackend.entity.DestinationAmenity;

import java.util.List;

public interface DestinationAmenityService {
    DestinationAmenity saveDestinationAmenity(DestinationAmenityRequest request);
    DestinationAmenity getDestinationAmenity(Long destinationId, Long amenityId);
    List<DestinationAmenity> getDestinationAmenities(Long destinationId);

}
