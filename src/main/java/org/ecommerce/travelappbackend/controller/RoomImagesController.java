package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.entity.RoomImage;
import org.ecommerce.travelappbackend.services.service.RoomImageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/room-images")
public class RoomImagesController {
    private final RoomImageService roomImageService;

    @GetMapping("/room/{id}")
    public ApiResponse<List<RoomImage>> getRoomImages(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", roomImageService.get(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

    @GetMapping("/fake")
    public ApiResponse<String> fakeData() {
        try {
            return new ApiResponse<>(200, "success", roomImageService.fakeData());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
}
