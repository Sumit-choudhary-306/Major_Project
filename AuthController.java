package com.optifleet.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api")
// Dono ports ko allow kiya hai
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}) 
public class AuthController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (repo.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered! 🛑");
            }
            User savedUser = repo.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUserOpt = repo.findByEmail(user.getEmail());
        
        if (existingUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found! ❌");
        }
        
        User existingUser = existingUserOpt.get();
        
        if (existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(existingUser); 
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials ❌");
    }
}