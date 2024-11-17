package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.ReviewRequest;
import org.ecommerce.travelappbackend.dtos.response.ReviewResponse;

import java.util.List;

public interface ReviewService {

    List<ReviewResponse> getAllReviews();
    List<ReviewResponse> getReviewsByDestinationId(Long destinationId);

    boolean saveReview(ReviewRequest request);
    String fakeData();
}
