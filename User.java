package com.optifleet.backend;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;
    
    @Column(name = "full_name")
    @JsonProperty("fullName")
    private String fullName;

    @Column(unique = true, nullable = false)
    @JsonProperty("email")
    private String email;

    // Isse 'true' kiya hai kyunki DB mein kuch values NULL hain
    @Column(name = "contact_number", nullable = true) 
    @JsonProperty("contactNumber") 
    private String contactNumber;
    
    @Column(nullable = false)
    @JsonProperty("password")
    private String password;
    
    @Column(name = "role", nullable = false)
    @JsonProperty("role")
    private String role = "USER"; 

    // Constructors, Getters & Setters wahi rahenge...
    public User() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}