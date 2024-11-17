package org.ecommerce.travelappbackend.repository;

import org.ecommerce.travelappbackend.dtos.response.ReviewResponse;
import org.ecommerce.travelappbackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
   List<Review> findAllByDestinationId(Long destinationId);
}
