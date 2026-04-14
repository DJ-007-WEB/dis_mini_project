package com.course_management_system.repository;

import com.course_management_system.model.Assignment;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository class for managing Assignment data.
 * Improved with SLF4J logging and safe resource handling.
 */
public class AssignmentRepository {

    private static final Logger log = LoggerFactory.getLogger(AssignmentRepository.class);

    public void addAssignment(Assignment a) {
        String sql = "INSERT INTO assignments (course_id, title, description) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, a.getCourseId());
                pstmt.setString(2, a.getTitle());
                pstmt.setString(3, a.getDesc());
                pstmt.executeUpdate();
                log.info("Assignment '{}' added successfully for course ID: {}", a.getTitle(), a.getCourseId());
            }
        } catch (SQLException e) {
            log.error("Error adding assignment: {}", a.getTitle(), e);
        }
    }

    public List<Assignment> getAssignmentsByCourse(int courseId) {
        List<Assignment> list = new ArrayList<>();
        String sql = "SELECT assign_id, course_id, title, description FROM assignments WHERE course_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return list;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, courseId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    while (rs.next()) {
                        list.add(new Assignment(
                                rs.getInt("assign_id"), 
                                rs.getInt("course_id"),
                                rs.getString("title"), 
                                rs.getString("description")
                        ));
                    }
                }
                log.info("Fetched {} assignments for course ID: {}", list.size(), courseId);
            }
        } catch (SQLException e) {
            log.error("Error fetching assignments for course ID: {}", courseId, e);
        }
        return list;
    }
}