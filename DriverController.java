package com.optifleet.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})  // Saare frontends (3000 aur 3001) ko allow karne ke liye
public class DriverController {

    @Autowired
    private DriverRepository repo;

    // 1. Registration API
    @PostMapping("/register")
    public Driver register(@RequestBody Driver driver) {
        return repo.save(driver);
    }

    // 2. Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        Driver d = repo.findByEmail(creds.get("email"));
        if (d != null && d.getPassword().equals(creds.get("password"))) {
            return ResponseEntity.ok(d);
        }
        return ResponseEntity.status(401).body("Invalid Email or Password");
    }

    // 3. Online/Offline Status Update
    @PatchMapping("/{id}/status")
    public Driver updateStatus(@PathVariable Integer id, @RequestBody Map<String, Boolean> status) {
        Driver d = repo.findById(id).get();
        d.setIsOnline(status.get("isOnline"));
        return repo.save(d);
    }
    
}