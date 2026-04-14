package com.course_management_system.repository;

import com.course_management_system.model.Enrollment;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository class for managing Student Enrollments in Courses.
 * Essential for the core functionality of an Online Course Management System.
 */
public class EnrollmentRepository {

    private static final Logger log = LoggerFactory.getLogger(EnrollmentRepository.class);

    /**
     * Enrolls a student in a course.
     * @param enrollment The enrollment details
     */
    public void enrollStudent(Enrollment enrollment) {
        String sql = "INSERT INTO enrollment (student_id, course_id, enroll_date, status) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null, cannot enroll student");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, enrollment.getStudentId());
                pstmt.setInt(2, enrollment.getCourseId());
                pstmt.setString(3, enrollment.getEnrollDate());
                pstmt.setString(4, enrollment.getStatus() != null ? enrollment.getStatus() : "Ongoing");
                pstmt.executeUpdate();
                log.info("Student ID {} successfully enrolled in course ID {}", enrollment.getStudentId(), enrollment.getCourseId());
            }
        } catch (SQLException e) {
            log.error("Error enrolling student ID {} in course ID {}", enrollment.getStudentId(), enrollment.getCourseId(), e);
        }
    }

    /**
     * Fetches all enrollments for a specific student.
     * @param studentId The student ID
     * @return List of Enrollments
     */
    public List<Enrollment> getEnrollmentsByStudent(int studentId) {
        List<Enrollment> list = new ArrayList<>();
        String sql = "SELECT enroll_id, student_id, course_id, enroll_date, status FROM enrollment WHERE student_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return list;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, studentId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    while (rs.next()) {
                        Enrollment e = new Enrollment();
                        e.setEnrollmentId(rs.getInt("enroll_id"));
                        e.setStudentId(rs.getInt("student_id"));
                        e.setCourseId(rs.getInt("course_id"));
                        e.setEnrollDate(rs.getString("enroll_date"));
                        e.setStatus(rs.getString("status"));
                        list.add(e);
                    }
                }
                log.info("Fetched {} enrollments for student ID {}", list.size(), studentId);
            }
        } catch (SQLException e) {
            log.error("Error fetching enrollments for student ID {}", studentId, e);
        }
        return list;
    }

    /**
     * Checks if a student is already enrolled in a course.
     * @param studentId The student ID
     * @param courseId The course ID
     * @return true if enrolled, false otherwise
     */
    public boolean isStudentEnrolled(int studentId, int courseId) {
        String sql = "SELECT 1 FROM enrollment WHERE student_id = ? AND course_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return false;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, studentId);
                pstmt.setInt(2, courseId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    return rs.next();
                }
            }
        } catch (SQLException e) {
            log.error("Error checking enrollment for student ID {} and course ID {}", studentId, courseId, e);
        }
        return false;
    }
}
