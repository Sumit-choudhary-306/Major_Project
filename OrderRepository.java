package com.optifleet.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Driver dashboard ke liye: available orders dhundna
    List<Order> findByDriverStatus(String driverStatus);
    
    // Payment check karne ke liye
    List<Order> findByStatus(String status);
}