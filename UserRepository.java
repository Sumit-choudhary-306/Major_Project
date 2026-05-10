package com.optifleet.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // 1. Email check karne ke liye
    boolean existsByEmail(String email); 

    // 2. Naya Update: Contact Number check karne ke liye
    // Isse duplicate phone numbers register nahi ho payenge
    boolean existsByContactNumber(String contactNumber); 

    // 3. Email se user dhundhne ke liye (Login ke liye)
    Optional<User> findByEmail(String email); 
}