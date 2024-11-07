package org.ecommerce.travelappbackend.repository;


import org.ecommerce.travelappbackend.entity.Destination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DestinationRepository extends JpaRepository<Destination, Long>{

    List<Destination> findByCategoryId(Long category_id);


    @Query("SELECT d FROM Destination d JOIN Room r ON r.destination.id=d.id WHERE "
            + "(:location IS NULL OR d.location LIKE CONCAT('%', :location, '%')) "
            + "AND (:categoryId IS NULL OR d.category.id = :categoryId) "
            + "AND (:averageRating IS NULL OR d.averageRating >= :averageRating)"
            + "AND (:price IS NULL OR r.price <= :price)")

    List<Destination> filterDestination(@Param("location") String location,
                                        @Param("categoryId") Long categoryId,
                                        @Param("averageRating") Double averageRating,
                                        @Param("price") Double price);




}
