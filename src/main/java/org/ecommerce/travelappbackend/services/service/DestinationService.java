package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.DestinationRequest;
import org.ecommerce.travelappbackend.entity.Destination;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DestinationService {
    Destination createDestination(DestinationRequest destinationRequest) throws Exception;

    Destination getDestination(Long id);

    void updateDestination(Long id, DestinationRequest destinationRequest);

    List<Destination> getAllDestinations(int page, int size);

    void deleteDestination(Long id);

    List<Destination> getDestinationByCategory(Long categoryId);

    void updateImage(Long id, String imageUrl);

    List<Destination> filterDestination(String location, Long categoryId, Double averageRating,Double price,Long amenityId);
    List<Destination> getDestinationByLocation(String location);
    List<Destination> findAvailableDestinations(String startDate, String endDate);

    List<Destination> searchDestination(String search);
}
