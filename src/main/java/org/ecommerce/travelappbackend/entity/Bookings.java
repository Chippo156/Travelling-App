package org.ecommerce.travelappbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = false)
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bookings extends BaseEntity{
    @Id
@Column(name = "booking_id")
@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
     int id;
    @Column(name = "user_id")
     int userId;
    @Column(name = "destination_id")
     int destinationId;
    @Column(name = "booking_time")
     LocalDate bookingTime;
    @Column(name = "booking_status")
     String bookingStatus;
    @Column(name = "payment_status")
     String paymentStatus;
    @Column(name = "payment_method")
     String paymentMethod;
    @Column(name = "payment_date")
     LocalDate paymentDate;

}
