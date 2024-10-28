package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.dtos.DestinationRequest;
import org.ecommerce.travelappbackend.entity.Category;
import org.ecommerce.travelappbackend.entity.Destination;
import org.ecommerce.travelappbackend.mapper.DestinationMapper;
import org.ecommerce.travelappbackend.responses.DestinationResponse;
import org.ecommerce.travelappbackend.services.impl.CategoryService;
import org.ecommerce.travelappbackend.services.impl.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/destinations")
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationService destinationService;
    private final DestinationMapper mapper;
    @PostMapping
    public ResponseEntity<DestinationResponse> createDestination(@RequestBody DestinationRequest destinationRequest){
        try{
            return ResponseEntity.ok(mapper.toDestinationResponse(destinationService.createDestination(destinationRequest)));
        }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping
    public ResponseEntity<List<DestinationResponse>> getListDestination(){
        try{
            List<Destination> destinations = destinationService.getAllDestinations();
            return ResponseEntity.ok(destinations.stream().map(mapper::toDestinationResponse).toList());
          }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<DestinationResponse> getDestination(@PathVariable int id){
        try{
            return ResponseEntity.ok(mapper.toDestinationResponse(destinationService.getDestination(id)));
        }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
