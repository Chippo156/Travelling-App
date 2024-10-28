package org.ecommerce.travelappbackend.services;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.DestinationRequest;
import org.ecommerce.travelappbackend.entity.Category;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.mapper.DestinationMapper;
import org.ecommerce.travelappbackend.repository.CategoryRepository;
import org.ecommerce.travelappbackend.repository.DestinationRepository;
import org.ecommerce.travelappbackend.services.impl.DestinationService;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationServiceImpl implements DestinationService {
    private final DestinationRepository destinationRepository;
    private final DestinationMapper mapper;
    private final CategoryRepository categoryRepository;
    @Override
    public Destination createDestination(DestinationRequest destinationRequest) throws Exception {
        try {
            Category category = categoryRepository.findById(destinationRequest.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            Destination destination = mapper.toDestination(destinationRequest);
            destination.setCategory(category);
            return destinationRepository.save(destination);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Destination getDestination(int id) {
        return destinationRepository.findById(id).orElseThrow(() -> new RuntimeException("Destination not found"));
    }

    @Override
    public Destination updateDestination(DestinationRequest destinationRequest) {
        return null;
    }

    @Override
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @Override
    public void deleteDestination(int id) {

    }

    @Override
    public List<Destination> getDestinationByCategory(int categoryId) {
        return null;
    }
}
