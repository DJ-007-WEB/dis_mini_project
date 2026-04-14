package com.course_management_system.service;

import com.course_management_system.model.Enrollment;
import com.course_management_system.repository.EnrollmentRepository;
import java.time.LocalDate;
import java.util.List;

/**
 * Service class for Managing Student Enrollments.
 */
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepo = new EnrollmentRepository();

    /**
     * Business logic for enrolling a student.
     * Checks if already enrolled before adding.
     */
    public boolean enrollStudent(int studentId, int courseId) {
        if (!enrollmentRepo.isStudentEnrolled(studentId, courseId)) {
            Enrollment enrollment = new Enrollment();
            enrollment.setStudentId(studentId);
            enrollment.setCourseId(courseId);
            enrollment.setEnrollDate(LocalDate.now().toString());
            
            enrollmentRepo.enrollStudent(enrollment);
            return true;
        }
        return false; // Already enrolled
    }

    public List<Enrollment> getStudentSchedule(int studentId) {
        return enrollmentRepo.getEnrollmentsByStudent(studentId);
    }
}
