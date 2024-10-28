package org.ecommerce.travelappbackend.services.impl;

import org.ecommerce.travelappbackend.dtos.DestinationRequest;
import org.ecommerce.travelappbackend.entity.Destination;

import java.util.List;

public interface DestinationService {
    public Destination createDestination(DestinationRequest destinationRequest) throws Exception;
    public Destination getDestination(int id);
public Destination updateDestination(DestinationRequest destinationRequest);
    public List<Destination> getAllDestinations();
    public void deleteDestination(int id);
    public List<Destination> getDestinationByCategory(int categoryId);


}
