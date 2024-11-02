package org.ecommerce.travelappbackend.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.PopularAmenityRequest;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.dtos.response.PopularAmenityResponse;
import org.ecommerce.travelappbackend.services.service.PopularAmenityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/amenities")
@RequiredArgsConstructor
public class PopularAmenityController {

    private final PopularAmenityService popularAmenityService;

    @GetMapping
    public ApiResponse<List<PopularAmenityResponse>> getListOfPopularAmenities() {
        try {
            return new ApiResponse<>(200, "success", popularAmenityService.getAllPopularAmenities());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

    @PostMapping
    public ApiResponse<PopularAmenityResponse> createPopularAmenity(@RequestBody PopularAmenityRequest popularAmenityRequest) {
        try {
            return new ApiResponse<>(200, "success", popularAmenityService.createPopularAmenity(popularAmenityRequest));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<PopularAmenityResponse> getPopularAmenity(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", popularAmenityService.getPopularAmenity(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);

        }
        }
    }

