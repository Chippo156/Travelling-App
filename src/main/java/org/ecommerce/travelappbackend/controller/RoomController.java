package org.ecommerce.travelappbackend.controller;


import com.cloudinary.Api;
import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.DestinationImageRequest;
import org.ecommerce.travelappbackend.dtos.request.RoomImageRequest;
import org.ecommerce.travelappbackend.dtos.request.RoomRequest;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.dtos.response.RoomResponse;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.DestinationImage;
import org.ecommerce.travelappbackend.entity.Room;
import org.ecommerce.travelappbackend.entity.RoomImage;
import org.ecommerce.travelappbackend.services.impl.CloudinaryService;
import org.ecommerce.travelappbackend.services.service.RoomImageService;
import org.ecommerce.travelappbackend.services.service.RoomService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/rooms")
public class RoomController {
    private final RoomService roomService;
    private final RoomImageService roomImageService;
    private final CloudinaryService cloudinaryService;
    private final Logger logger = Logger.getLogger(RoomController.class.getName());


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
    @PostMapping(value = "/uploadImages/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<RoomResponse> uploadImage(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        try {
            if (id == null || files == null || files.isEmpty()) {
                throw new IllegalArgumentException("Invalid input parameters");
            }
            RoomResponse roomResponse = roomService.getRoomById(id);

            List<String> urls = cloudinaryService.upload(files);
            for (String url : urls) {
                System.out.println(url);
                RoomImage roomImage = roomImageService.uploadImage(id,
                        RoomImageRequest.builder().imageUrl(url).build());

                if(roomResponse.getImageUrl() == null){
                    roomService.updateImage(id, url);
                }
            }
            return new ApiResponse<>(200, "success", roomResponse);

        } catch (IllegalArgumentException e) {
            logger.severe("Invalid input parameters");
            return new ApiResponse<>(400, e.getMessage(), null);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return new ApiResponse<>(500, e.getMessage(), null);
    }
    }
    @GetMapping("/destination/{id}")
    public ApiResponse<List<RoomResponse>> getRoomsByDestination(@PathVariable Long id) {
        try {
            return new ApiResponse<>(200, "success", roomService.getRoomsByDestinationId(id));
        } catch (Exception ex) {
            return new ApiResponse<>(400, ex.getMessage(), null);
        }
    }
}
