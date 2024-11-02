package org.ecommerce.travelappbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "room_images")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomImage {
    @Id
    @Column(name = "image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "image_url")
    String imageUrl;
    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;
}
