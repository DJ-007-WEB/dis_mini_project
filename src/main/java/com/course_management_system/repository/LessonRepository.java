package com.course_management_system.repository;

import com.course_management_system.util.DBConnection;
import java.sql.*;

public class LessonRepository {
    public void addLesson(int courseId, String title, String desc, String url) {
        String sql = "INSERT INTO lessons (course_id, title, desc, lesson_url) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, courseId);
            pstmt.setString(2, title);
            pstmt.setString(3, desc);
            pstmt.setString(4, url);
            pstmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}
