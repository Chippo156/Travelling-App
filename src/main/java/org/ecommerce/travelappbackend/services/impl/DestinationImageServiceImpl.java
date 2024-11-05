package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.request.DestinationImageRequest;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.entity.DestinationImage;
import org.ecommerce.travelappbackend.repository.DestinationImageRepository;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.services.service.DestinationImageService;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DestinationImageServiceImpl implements DestinationImageService {

     private final DestinationRepository destinationRepository;
     private final DestinationImageRepository destinationImageRepository;
     @Override
     public DestinationImage uploadImage(Long destinationId, DestinationImageRequest request) {
          Destination destination = destinationRepository.findById(destinationId).orElseThrow(()->new RuntimeException("Destination not found"));
            DestinationImage destinationImage = new DestinationImage();
            destinationImage.setDestination(destination);
            destinationImage.setImageUrl(request.getImageUrl());
            int size = destinationImageRepository.findAllByDestinationId(destinationId).size();
          if (size >= 7) {
                throw new RuntimeException("You can't upload more than 7 images");
             } else {
                return destinationImageRepository.save(destinationImage);
          }

     }
}
