package com.optifleet.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}) 
public class OrderController {
    
    @Autowired
    private OrderRepository orderRepository;

    // 1. GET ALL ORDERS: Admin dashboard ke liye
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 2. GET PENDING: Driver dashboard ke liye
    @GetMapping("/pending")
    public List<Order> getPendingOrders() {
        return orderRepository.findByDriverStatus("Inactive");
    }

    // 3. CREATE ORDER: Booking page ke liye
    @PostMapping("/book")
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            if (order.getDriverStatus() == null) order.setDriverStatus("Inactive");
            if (order.getStatus() == null) order.setStatus("Unpaid");
            return ResponseEntity.ok(orderRepository.save(order));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // 4. ACCEPT ORDER: Driver order accept karega
    @PatchMapping("/{id}/accept")
    public ResponseEntity<?> acceptOrder(@PathVariable Long id, @RequestBody Map<String, Integer> driverData) {
        return orderRepository.findById(id).map(order -> {
            order.setDriverStatus("Active"); 
            order.setDriverId(driverData.get("driverId"));
            order.setAcceptedAt(LocalDateTime.now());
            orderRepository.save(order);
            return ResponseEntity.ok("Order Accepted! Driver Status is now ACTIVE ✅");
        }).orElse(ResponseEntity.notFound().build());
    }

    // 5. UPDATE PAYMENT: Payment status change karne ke liye
    @PatchMapping("/{id}/payment")
    public ResponseEntity<?> updatePayment(@PathVariable Long id, @RequestBody Map<String, String> paymentData) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(paymentData.get("status")); 
            orderRepository.save(order);
            return ResponseEntity.ok("Payment Status Updated in DB 💰");
        }).orElse(ResponseEntity.notFound().build());
    }

    // 6. DELETE ORDER: Admin dashboard cancel button ke liye (Fixed Logic)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        return orderRepository.findById(id).map(order -> {
            orderRepository.delete(order);
            return ResponseEntity.ok("Order deleted successfully! 🗑️");
        }).orElse(ResponseEntity.notFound().build());
    }
}