package com.course_management_system.repository;

import com.course_management_system.model.Certificate;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository class for managing Certificate data.
 * Improved with SLF4J logging and safe resource handling.
 */
public class CertificateRepository {

    private static final Logger log = LoggerFactory.getLogger(CertificateRepository.class);

    public void addCertificate(Certificate cert) {
        String sql = "INSERT INTO certificates (student_id, course_id, issue_date) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, cert.getStudentId());
                pstmt.setInt(2, cert.getCourseId());
                pstmt.setString(3, cert.getIssueDate());
                pstmt.executeUpdate();
                log.info("Certificate issued for student ID: {} in course ID: {}", cert.getStudentId(), cert.getCourseId());
            }
        } catch (SQLException e) {
            log.error("Error issuing certificate", e);
        }
    }

    public List<Certificate> getCertificatesByStudent(int studentId) {
        List<Certificate> list = new ArrayList<>();
        String sql = "SELECT cert_id, student_id, course_id, issue_date FROM certificates WHERE student_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return list;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, studentId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    while (rs.next()) {
                        list.add(new Certificate(
                                rs.getInt("cert_id"),
                                rs.getInt("student_id"),
                                rs.getInt("course_id"),
                                rs.getString("issue_date")
                        ));
                    }
                }
                log.info("Fetched {} certificates for student ID: {}", list.size(), studentId);
            }
        } catch (SQLException e) {
            log.error("Error fetching certificates", e);
        }
        return list;
    }
}