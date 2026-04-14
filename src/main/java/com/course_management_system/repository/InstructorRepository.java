package com.course_management_system.repository;

import com.course_management_system.model.Instructor;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository class for managing Instructor data.
 * Improved with better logging and resource management.
 */
public class InstructorRepository {

    private static final Logger log = LoggerFactory.getLogger(InstructorRepository.class);

    public List<Instructor> getAllInstructors() {
        List<Instructor> instructors = new ArrayList<>();
        String sql = "SELECT instructor_id, name, email FROM instructor";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return instructors;
            }
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)) {
                while (rs.next()) {
                    instructors.add(new Instructor(
                            rs.getInt("instructor_id"),
                            rs.getString("name"),
                            rs.getString("email")
                    ));
                }
                log.info("Fetched {} instructors", instructors.size());
            }
        } catch (SQLException e) {
            log.error("Error fetching instructors", e);
        }
        return instructors;
    }

    public void addInstructor(Instructor instructor) {
        String sql = "INSERT INTO instructor (name, email) VALUES (?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, instructor.getName());
                pstmt.setString(2, instructor.getEmail());
                pstmt.executeUpdate();
                log.info("Instructor added: {}", instructor.getName());
            }
        } catch (SQLException e) {
            log.error("Error adding instructor: {}", instructor.getName(), e);
        }
    }

    public int getInstructorCount() {
        String sql = "SELECT COUNT(*) FROM instructor";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return 0;
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)) {
                if (rs.next()) return rs.getInt(1);
            }
        } catch (SQLException e) {
            log.error("Error getting instructor count", e);
        }
        return 0;
    }
}