package org.ecommerce.travelappbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bookings extends BaseEntity {
    @Id
    @Column(name = "booking_id")
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    @ManyToOne
    @JoinColumn(name = "destination_id")
    Destination destination;
    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;
    @Column(name = "check_in_date")
    LocalDate checkInDate;
    @Column(name = "check_out_date")
    LocalDate checkOutDate;
    @Column(name = "booking_status")
    String bookingStatus;
    @Column(name = "payment_status")
    String paymentStatus;
    @Column(name = "payment_method")
    String paymentMethod;
    @Column(name = "payment_date")
    LocalDate paymentDate;
    @Column(name = "amount")
    double amount;
    int quantity;
}
