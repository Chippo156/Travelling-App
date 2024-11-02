package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.DestinationRequest;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.dtos.response.DestinationResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DestinationMapper {
    Destination toDestination(DestinationRequest destinationRequest);
    DestinationResponse toDestinationResponse(Destination destination);
}
