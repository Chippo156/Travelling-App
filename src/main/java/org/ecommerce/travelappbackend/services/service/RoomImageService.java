package org.ecommerce.travelappbackend.services.service;


import org.ecommerce.travelappbackend.dtos.request.RoomImageRequest;
import org.ecommerce.travelappbackend.entity.RoomImage;

public interface RoomImageService {

    RoomImage uploadImage(Long roomId, RoomImageRequest request);

}
