package org.ecommerce.travelappbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "popular_amenities")
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopularAmenity {
    @Id
    @Column(name = "amenity_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String amenityName;
    private String amenityIcon;
}
