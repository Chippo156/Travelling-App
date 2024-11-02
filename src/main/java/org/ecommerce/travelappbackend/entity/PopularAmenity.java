package org.ecommerce.travelappbackend.entity;

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
    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;

}
