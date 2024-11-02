package org.ecommerce.travelappbackend.controller;


import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.RoomRequest;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.dtos.response.RoomResponse;
import org.ecommerce.travelappbackend.services.service.RoomService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/rooms")
public class RoomController {
    private final RoomService roomService;


    @GetMapping
    public ApiResponse<List<RoomResponse>> getListOfRooms() {
        try {
            return new ApiResponse<>(200, "success", roomService.getAllRooms());
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @PostMapping
    public ApiResponse<RoomResponse> createRoom(@RequestBody RoomRequest roomRequest) {
        try {
            return new ApiResponse<>(200, "success", roomService.saveRoom(roomRequest));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @GetMapping("/{id}")
    public ApiResponse<RoomResponse> getRoom(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", roomService.getRoomById(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteRoom(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            return new ApiResponse<>(200, "success", "Room deleted successfully");
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }

}
