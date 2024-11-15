package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.dtos.request.DestinationImageRequest;
import org.ecommerce.travelappbackend.entity.DestinationImage;

import java.util.List;

public interface DestinationImageService {
     DestinationImage uploadImage(Long destinationId, DestinationImageRequest request);
     List<DestinationImage> get(Long destinationId);
}
