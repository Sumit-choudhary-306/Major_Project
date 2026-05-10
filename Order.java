package com.optifleet.backend;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemDescription;
    private String category;
    private String pickup;

    @Column(name = "drop_location")
    private String dropLocation;

    private String vehicle;
    private double distance;
    private double weight;
    private double totalPrice;
    
    // 🔥 DATABASE ALIGNMENT: 'status' for Payment
    @Column(name = "status")
    private String status = "Unpaid"; 
    
    // 🔥 DATABASE ALIGNMENT: 'driver_status' for Delivery Progress
    @Column(name = "driver_status")
    private String driverStatus = "Inactive"; // Inactive, Active, Delivered

    @Column(name = "payment_method")
    private String paymentMethod; 

    @Column(name = "driver_id")
    private Integer driverId;

    @Column(name = "accepted_at")
    private LocalDateTime acceptedAt;

    private LocalDateTime orderDate = LocalDateTime.now();

    public Order() {}

    @PrePersist
    @PreUpdate
    public void calculateFare() {
        double baseFare = 50.0;
        double vehicleRate = 10.0;
        if (this.vehicle != null) {
            switch (this.vehicle.toLowerCase()) {
                case "van": vehicleRate = 25.0; break;
                case "truck": vehicleRate = 50.0; break;
                default: vehicleRate = 10.0; break;
            }
        }
        this.totalPrice = baseFare + (this.distance * vehicleRate) + (this.weight * 5.0);
    }

    // --- GETTERS & SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemDescription() { return itemDescription; }
    public void setItemDescription(String itemDescription) { this.itemDescription = itemDescription; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getPickup() { return pickup; }
    public void setPickup(String pickup) { this.pickup = pickup; }
    public String getDropLocation() { return dropLocation; }
    public void setDropLocation(String dropLocation) { this.dropLocation = dropLocation; }
    public String getVehicle() { return vehicle; }
    public void setVehicle(String vehicle) { this.vehicle = vehicle; }
    public double getDistance() { return distance; }
    public void setDistance(double distance) { this.distance = distance; }
    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }
    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDriverStatus() { return driverStatus; }
    public void setDriverStatus(String driverStatus) { this.driverStatus = driverStatus; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public Integer getDriverId() { return driverId; }
    public void setDriverId(Integer driverId) { this.driverId = driverId; }
    public LocalDateTime getAcceptedAt() { return acceptedAt; }
    public void setAcceptedAt(LocalDateTime acceptedAt) { this.acceptedAt = acceptedAt; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
}