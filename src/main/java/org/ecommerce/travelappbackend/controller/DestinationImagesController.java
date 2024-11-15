package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.entity.DestinationImage;
import org.ecommerce.travelappbackend.services.service.DestinationImageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/destination-images")
public class DestinationImagesController {

    private final DestinationImageService destinationImageService;
    @GetMapping("/destination/{id}")
    public ApiResponse<List<DestinationImage>> getDestinationImages(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", destinationImageService.get(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

}
