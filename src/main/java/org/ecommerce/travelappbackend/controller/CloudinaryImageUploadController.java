package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.services.impl.CloudinaryService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/cloudinary/upload")
@RequiredArgsConstructor
public class CloudinaryImageUploadController {
    private final CloudinaryService cloudinaryService;
    @PostMapping (consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<String>> uploadImage(@RequestParam("files") List<MultipartFile> files){
        List<String> urls = cloudinaryService.upload(files);
        return ResponseEntity.ok().body(urls);
    }
}
