package org.ecommerce.travelappbackend.services.service;


import org.ecommerce.travelappbackend.dtos.request.RoomImageRequest;
import org.ecommerce.travelappbackend.entity.RoomImage;

import java.util.List;

public interface RoomImageService {

    RoomImage uploadImage(Long roomId, RoomImageRequest request);
    List<RoomImage> get(Long roomId);

}
