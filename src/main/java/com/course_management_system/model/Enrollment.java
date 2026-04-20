package com.course_management_system.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class Enrollment {
    private int enrollmentId;
    private int studentId;
    private int courseId;
    private String enrollDate; // Date of enrollment
    private String status;     // e.g., "Ongoing", "Completed"
}
