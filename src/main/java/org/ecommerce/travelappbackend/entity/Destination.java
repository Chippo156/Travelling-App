package org.ecommerce.travelappbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "destinations")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Destination {
    @Id
    @Column(name = "destination_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String description;
    String location;
    @Column(name = "average_rating")
    double averageRating;
    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;
    @Column(name = "image_url")
    String imageUrl;
    @OneToMany(mappedBy = "destination",cascade = CascadeType.ALL)
    List<Room> rooms;
}
