package com.course_management_system.repository;

import com.course_management_system.model.Instructor;
import com.course_management_system.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class InstructorRepository {

    public List<Instructor> getAllInstructors() {
        List<Instructor> instructors = new ArrayList<>();
        String sql = "SELECT * FROM instructor";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                instructors.add(new Instructor(
                        rs.getInt("instructor_id"),
                        rs.getString("name"),
                        rs.getString("email")
                ));
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return instructors;
    }

    public void addInstructor(Instructor instructor) {
        String sql = "INSERT INTO instructor (name, email) VALUES (?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, instructor.getName());
            pstmt.setString(2, instructor.getEmail());
            pstmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public int getInstructorCount() {
        String sql = "SELECT COUNT(*) FROM instructor";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            if (rs.next()) return rs.getInt(1);
        } catch (SQLException e) { e.printStackTrace(); }
        return 0;
    }
}