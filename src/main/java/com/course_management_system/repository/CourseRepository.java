package com.course_management_system.repository;

import com.course_management_system.model.Course;
import com.course_management_system.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CourseRepository {

    public List<Course> getAllCourses() {
        List<Course> courses = new ArrayList<>();
        String sql = "SELECT * FROM course";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                courses.add(new Course(
                        rs.getInt("course_id"),
                        rs.getString("title"),
                        rs.getString("desc"),
                        rs.getInt("instructor_id")
                ));
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return courses;
    }

    public void addCourse(Course course) {
        String sql = "INSERT INTO course (title, desc, instructor_id) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, course.getTitle());
            pstmt.setString(2, course.getDesc());
            pstmt.setInt(3, course.getInstructorId());
            pstmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}