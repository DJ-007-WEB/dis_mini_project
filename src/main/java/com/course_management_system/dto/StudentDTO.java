package com.course_management_system.dto;

import com.course_management_system.model.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object for Student.
 * Includes additional fields like enrolled course IDs to minimize frontend/backend sync issues.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private int studentId;
    private String name;
    private String phone;
    private String email;
    private List<Integer> enrolledCourseIds;

    public static StudentDTO fromStudent(Student s, List<Integer> enrolledIds) {
        return new StudentDTO(
            s.getStudentId(),
            s.getName(),
            s.getPhone(),
            s.getEmail(),
            enrolledIds
        );
    }
}
