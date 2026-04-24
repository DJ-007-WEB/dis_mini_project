package com.course_management_system.repository;

import com.course_management_system.model.Admin;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AdminRepository {
    private static final Logger log = LoggerFactory.getLogger(AdminRepository.class);

    public Admin authenticate(String email, String password) {
        String sql = "SELECT admin_id, name, email FROM admin WHERE email = ? AND password = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return null;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, email);
                pstmt.setString(2, password);
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        log.info("Admin logged in successfully: {}", email);
                        return new Admin(
                            rs.getInt("admin_id"),
                            rs.getString("name"),
                            rs.getString("email"),
                            null // Don't return password
                        );
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Error authenticating admin", e);
        }
        return null;
    }
}
