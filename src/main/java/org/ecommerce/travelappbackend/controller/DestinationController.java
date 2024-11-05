package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ecommerce.travelappbackend.dtos.request.DestinationImageRequest;
import org.ecommerce.travelappbackend.dtos.request.DestinationRequest;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.DestinationImage;
import org.ecommerce.travelappbackend.mapper.DestinationMapper;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.dtos.response.DestinationResponse;
import org.ecommerce.travelappbackend.services.impl.CloudinaryService;
import org.ecommerce.travelappbackend.services.service.DestinationImageService;
import org.ecommerce.travelappbackend.services.service.DestinationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("${api.prefix}/destinations")
@RequiredArgsConstructor
@Slf4j
public class DestinationController {
    private final DestinationService destinationService;
    private final DestinationMapper mapper;
    private final DestinationImageService destinationImageService;
    private final CloudinaryService cloudinaryService;
    private final Logger logger = Logger.getLogger(DestinationController.class.getName());
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
    @PostMapping(value = "/uploadImages/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Destination> uploadImage(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        try {
            if (id == null || files == null || files.isEmpty()) {
                throw new IllegalArgumentException("Invalid input parameters");
            }
            Destination destination = destinationService.getDestination(id);
            List<String> urls = cloudinaryService.upload(files);
            for (String url : urls) {
                System.out.println(url);
                DestinationImage destinationImage = destinationImageService.uploadImage(destination.getId(),
                        DestinationImageRequest.builder()
                                .imageUrl(url)
                                .build()
                );
                if(destination.getImageUrl().isEmpty()){
                    destinationService.updateImage(destination.getId(),url);
                }
            }
            return ResponseEntity.ok().body(destination);

        } catch (IllegalArgumentException e) {
            logger.severe("Invalid input parameters");
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

}
