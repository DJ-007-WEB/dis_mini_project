package com.course_management_system.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data                // Automatically generates Getters, Setters, toString, equals
@NoArgsConstructor   // Generates a no-argument constructor
@AllArgsConstructor  // Generates a constructor with all fields
public class Student {
    private int studentId;
    private String name;
    private String phone;
    private String email;
}
