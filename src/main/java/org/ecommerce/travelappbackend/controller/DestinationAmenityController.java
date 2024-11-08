package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.DestinationAmenityRequest;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.entity.DestinationAmenity;
import org.ecommerce.travelappbackend.entity.PopularAmenity;
import org.ecommerce.travelappbackend.services.service.DestinationAmenityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/destination-amenity")
@RequiredArgsConstructor
public class DestinationAmenityController {

    private final DestinationAmenityService destinationAmenityService;

    @PostMapping
    public ApiResponse<DestinationAmenity> saveDestinationAmenity(@RequestBody DestinationAmenityRequest request) {

        try{
           DestinationAmenity destinationAmenity= destinationAmenityService.saveDestinationAmenity(request);

            return new ApiResponse<>(200,"Destination Amenity saved successfully",destinationAmenity);

        }catch (Exception e ){
            return new ApiResponse<>(500,e.getMessage(),null);
        }
    }
    @GetMapping("destination/{id}")
    public ApiResponse<List<PopularAmenity>> getDestinationAmenity(@PathVariable Long id) {
        try{
            List<DestinationAmenity> destinationAmenity= destinationAmenityService.getDestinationAmenities(id);
            List<PopularAmenity> amenities = destinationAmenity.stream().map(DestinationAmenity::getAmenity).toList();
            return new ApiResponse<>(200,"Destination Amenities fetched successfully",amenities);

        }catch (Exception e ){
            return new ApiResponse<>(500,e.getMessage(),null);
        }
    }




}
