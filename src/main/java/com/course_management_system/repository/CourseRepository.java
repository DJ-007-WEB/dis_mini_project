package com.course_management_system.repository;

import com.course_management_system.model.Course;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository class for managing Course data.
 * Improved for scalability, security, and consistent logging.
 */
public class CourseRepository {

    private static final Logger log = LoggerFactory.getLogger(CourseRepository.class);

    public List<Course> getAllCourses() {
        List<Course> courses = new ArrayList<>();
        String sql = "SELECT course_id, title, description, instructor_id FROM course";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return courses;
            }
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)) {
                
                while (rs.next()) {
                    courses.add(new Course(
                            rs.getInt("course_id"),
                            rs.getString("title"),
                            rs.getString("description"),
                            rs.getInt("instructor_id")
                    ));
                }
                log.info("Fetched {} courses", courses.size());
            }
        } catch (SQLException e) {
            log.error("Error fetching courses", e);
        }
        return courses;
    }

    public void addCourse(Course course) {
        String sql = "INSERT INTO course (title, description, instructor_id) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, course.getTitle());
                pstmt.setString(2, course.getDesc());
                pstmt.setInt(3, course.getInstructorId());
                pstmt.executeUpdate();
                log.info("Course added successfully: {}", course.getTitle());
            }
        } catch (SQLException e) {
            log.error("Error adding course: {}", course.getTitle(), e);
        }
    }
}