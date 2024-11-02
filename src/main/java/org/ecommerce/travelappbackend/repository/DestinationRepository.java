package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.Destination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DestinationRepository extends JpaRepository<Destination, Long>{

    List<Destination> findByCategoryId(Long category_id);


}
