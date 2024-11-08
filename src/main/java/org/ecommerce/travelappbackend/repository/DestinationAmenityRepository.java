package org.ecommerce.travelappbackend.repository;

import org.ecommerce.travelappbackend.entity.DestinationAmenity;
import org.ecommerce.travelappbackend.entity.PopularAmenity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationAmenityRepository  extends JpaRepository<DestinationAmenity,Long> {

    List<DestinationAmenity> findByDestinationId(Long destinationId);
}
