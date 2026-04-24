package com.course_management_system.repository;

import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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

    public List<com.course_management_system.model.Lesson> getLessonsByCourseId(int courseId) {
        List<com.course_management_system.model.Lesson> lessons = new ArrayList<>();
        String sql = "SELECT less_id, course_id, title, description, less_url FROM lessons WHERE course_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return lessons;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, courseId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    while (rs.next()) {
                        lessons.add(new com.course_management_system.model.Lesson(
                                rs.getInt("less_id"),
                                rs.getInt("course_id"),
                                rs.getString("title"),
                                rs.getString("description"),
                                rs.getString("less_url")
                        ));
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Error fetching lessons for course ID: {}", courseId, e);
        }
        return lessons;
    }
}
