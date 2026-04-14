package com.course_management_system.repository;

import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

/**
 * Repository class for managing Lesson data.
 * Improved with SLF4J logging and PreparedStatement usage.
 */
public class LessonRepository {

    private static final Logger log = LoggerFactory.getLogger(LessonRepository.class);

    public void addLesson(int courseId, String title, String desc, String url) {
        String sql = "INSERT INTO lessons (course_id, title, description, less_url) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null, cannot add lesson");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, courseId);
                pstmt.setString(2, title);
                pstmt.setString(3, desc);
                pstmt.setString(4, url);
                pstmt.executeUpdate();
                log.info("Lesson '{}' added successfully for course ID: {}", title, courseId);
            }
        } catch (SQLException e) {
            log.error("Error adding lesson: {}", title, e);
        }
    }
}
