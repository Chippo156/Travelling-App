package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.ReviewRequest;
import org.ecommerce.travelappbackend.dtos.response.ReviewResponse;
import org.ecommerce.travelappbackend.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review toReview(ReviewRequest request);


    @Mapping(target = "username", expression = "java(review.getUser().getFirstName() + ' ' + review.getUser().getLastName())")
    ReviewResponse toReviewResponse(Review review);

}
