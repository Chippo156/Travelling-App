package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.DestinationImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationImageRepository extends JpaRepository<DestinationImage, Long>{
    List<DestinationImage> findAllByDestinationId(Long destinationId);
}
