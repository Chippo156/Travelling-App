package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.DestinationRequest;
import org.ecommerce.travelappbackend.mapper.DestinationMapper;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.dtos.response.DestinationResponse;
import org.ecommerce.travelappbackend.services.service.DestinationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/destinations")
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationService destinationService;
    private final DestinationMapper mapper;
    @PostMapping
    public ApiResponse<DestinationResponse> createDestination(@RequestBody DestinationRequest destinationRequest){
        try
        {
            return new ApiResponse<>(200,"success",
                    mapper.toDestinationResponse(
                            destinationService.createDestination(destinationRequest))
                    );
        } catch (Exception e) {
            return new ApiResponse<>(400,e.getMessage(),null);
        }

    }
    @GetMapping
    public ApiResponse<List<DestinationResponse>> getListDestination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        try {
            return new ApiResponse<>(200,"success",
                    destinationService.getAllDestinations(page,size).stream().map(mapper::toDestinationResponse).toList());
        }catch (Exception e){
            return new ApiResponse<>(400,e.getMessage(),null);
        }
    }
    @GetMapping("/{id}")
    public ApiResponse<DestinationResponse> getDestination(@PathVariable Long id){
        try {
            return new ApiResponse<>(200,"success",
                    mapper.toDestinationResponse(destinationService.getDestination(id)));
        }catch (Exception e){
            return new ApiResponse<>(400,e.getMessage(),null);
        }
    }
}
