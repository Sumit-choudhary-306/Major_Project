package com.optifleet.backend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Integer> {
    // Custom query: Email se driver dhundne ke liye
    Driver findByEmail(String email);
}
