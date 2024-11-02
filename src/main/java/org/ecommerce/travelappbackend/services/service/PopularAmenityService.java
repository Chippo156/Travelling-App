package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.PopularAmenityRequest;
import org.ecommerce.travelappbackend.dtos.response.PopularAmenityResponse;
import org.ecommerce.travelappbackend.entity.PopularAmenity;

import java.util.List;

public interface PopularAmenityService {
    PopularAmenityResponse createPopularAmenity(PopularAmenityRequest popularAmenityRequest);
    PopularAmenityResponse getPopularAmenity(Long id);
    List<PopularAmenityResponse> getAllPopularAmenities();

}
