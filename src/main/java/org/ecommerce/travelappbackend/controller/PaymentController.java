package org.ecommerce.travelappbackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.ecommerce.travelappbackend.dtos.request.BookingRequest;
import org.ecommerce.travelappbackend.entity.Bookings;
import org.ecommerce.travelappbackend.mapper.BookingMapper;
import org.ecommerce.travelappbackend.services.impl.PaymentService;
import org.ecommerce.travelappbackend.services.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/payment")
@CrossOrigin(origins = "http://localhost:8081")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final BookingService bookingService;
    private final BookingMapper bookingMapper;

    @GetMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request) {
        return ResponseEntity.ok(paymentService.createVnPayPayment(request));
    }
    @GetMapping("/vnpay-callback")
    public ResponseEntity<?> payCallBackHandle(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            Long bookingId = Long.parseLong(request.getParameter("vnp_OrderInfo"));
            Bookings booking = bookingService.getBooking(bookingId);
            booking.setPaymentStatus("PAID");
            BookingRequest requestBooking = bookingMapper.toBookingRequest(booking);
            bookingService.updateBooking(bookingId, requestBooking);

            response.sendRedirect("http://localhost:8081/HistoryBooking?paymentStatus=01");
            return ResponseEntity.ok(response.getStatus());
        }else{
            response.sendRedirect("http://localhost:8081/HistoryBooking?paymentStatus=02");
            return ResponseEntity.ok("Thanh toán thất bại");
        }
    }
}
