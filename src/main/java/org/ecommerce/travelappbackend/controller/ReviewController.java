package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.ReviewRequest;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.services.service.ReviewService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    @PostMapping
    public ApiResponse<String> createReview(@RequestBody ReviewRequest reviewRequest) {
        try{
            reviewService.saveReview(reviewRequest);
            return new ApiResponse<>(200, "success", null);
        }catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/destination/{destinationId}")
    public ApiResponse<?> getReviewsByDestinationId(@PathVariable Long destinationId){
        try{
            return new ApiResponse<>(200, "success", reviewService.getReviewsByDestinationId(destinationId));
        }catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
    @GetMapping("/fake")
    public ApiResponse<?> fakeData(){
        try{
            reviewService.fakeData();
            return new ApiResponse<>(200, "success", null);
        }catch (Exception e){
            return new ApiResponse<>(400, e.getMessage(), null);
        }
    }
}
