package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.ReviewRequest;
import org.ecommerce.travelappbackend.dtos.response.ReviewResponse;
import org.ecommerce.travelappbackend.entity.Review;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review toReview(ReviewRequest request);
    ReviewResponse toReviewResponse(Review review);

}
