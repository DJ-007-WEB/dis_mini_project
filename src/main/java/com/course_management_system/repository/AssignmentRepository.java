package com.course_management_system.repository;
import com.course_management_system.model.Assignment;
import com.course_management_system.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AssignmentRepository {
    public void addAssignment(Assignment a) {
        String sql = "INSERT INTO assignments (course_id, title, description) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, a.getCourseId());
            pstmt.setString(2, a.getTitle());
            pstmt.setString(3, a.getDesc());
            pstmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<Assignment> getAssignmentsByCourse(int courseId) {
        List<Assignment> list = new ArrayList<>();
        String sql = "SELECT * FROM assignments WHERE course_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, courseId);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                list.add(new Assignment(rs.getInt("assign_id"), rs.getInt("course_id"),
                        rs.getString("title"), rs.getString("description")));
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return list;
    }
}