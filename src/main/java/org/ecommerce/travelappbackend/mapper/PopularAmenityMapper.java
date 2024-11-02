package org.ecommerce.travelappbackend.mapper;

import org.ecommerce.travelappbackend.dtos.request.PopularAmenityRequest;
import org.ecommerce.travelappbackend.dtos.response.PopularAmenityResponse;
import org.ecommerce.travelappbackend.entity.PopularAmenity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PopularAmenityMapper {

    PopularAmenity popularAmenityRequestToPopularAmenity(PopularAmenityRequest popularAmenityRequest);
    @Mapping(target = "destinationId", source = "popularAmenity.destination.id")
    PopularAmenityResponse popularAmenityToPopularAmenityResponse(PopularAmenity popularAmenity);

}
