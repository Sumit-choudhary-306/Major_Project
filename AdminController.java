package com.optifleet.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin") // Base Path for all Admin operations
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository; // Order handle karne ke liye

    // --- ADMIN LOGIN LOGIC ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        System.out.println("Admin Login attempt for: " + loginData.getEmail());
        
        Optional<User> adminOpt = userRepository.findByEmail(loginData.getEmail());
        
        if (adminOpt.isPresent()) {
            User admin = adminOpt.get();
            // Checking if the user has ADMIN role (Optional but safe)
            if (admin.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(admin); 
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Admin Password! ❌");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found! ❌");
    }

    // --- 1. MANAGE USERS ---
    
    // GET: All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // DELETE: Particular User
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
                return ResponseEntity.ok("User Deleted Successfully ✅");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found ❌");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // --- 2. MANAGE ORDERS / BOOKINGS ---

    // GET: All Orders (Recent Bookings Tab ke liye)
    // URL: http://localhost:8080/api/admin/orders
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // DELETE: Cancel/Delete Order
    // URL: http://localhost:8080/api/admin/orders/{id}
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            if (orderRepository.existsById(id)) {
                orderRepository.deleteById(id);
                return ResponseEntity.ok("Order Cancelled/Deleted Successfully ✅");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found ❌");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}