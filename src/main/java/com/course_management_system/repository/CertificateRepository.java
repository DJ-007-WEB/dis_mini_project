package com.course_management_system.repository;

import com.course_management_system.util.DBConnection;
import java.sql.*;

public class CertificateRepository {

    // 1. Logic to Enroll a student
    public void enrollStudent(int studentId, int courseId) {
        String sql = "INSERT INTO enrollment (student_id, course_id, status) VALUES (?, ?, 'Ongoing')";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, studentId);
            pstmt.setInt(2, courseId);
            pstmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    // 2. Logic to Issue a Certificate
    public void generateCertificate(int studentId, int courseId) {
        String sql = "INSERT INTO certificates (student_id, course_id, issue_date) VALUES (?, ?, NOW())";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, studentId);
            pstmt.setInt(2, courseId);
            pstmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}