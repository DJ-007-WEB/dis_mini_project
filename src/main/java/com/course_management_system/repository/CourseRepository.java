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
            if (conn == null) return courses;
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
            }
        } catch (SQLException e) {
            log.error("Error fetching courses", e);
        }
        return courses;
    }

    public boolean addCourse(Course course) {
        String sql = "INSERT INTO course (title, description, instructor_id) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return false;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, course.getTitle());
                pstmt.setString(2, course.getDesc());
                pstmt.setInt(3, course.getInstructorId() > 0 ? course.getInstructorId() : 1); // Default to instructor 1
                int affected = pstmt.executeUpdate();
                log.info("Course added successfully: {}", course.getTitle());
                return affected > 0;
            }
        } catch (SQLException e) {
            log.error("Error adding course: {}", course.getTitle(), e);
            return false;
        }
    }

    public boolean updateCourse(Course course) {
        String sql = "UPDATE course SET title = ?, description = ?, instructor_id = ? WHERE course_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return false;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, course.getTitle());
                pstmt.setString(2, course.getDesc());
                pstmt.setInt(3, course.getInstructorId() > 0 ? course.getInstructorId() : 1);
                pstmt.setInt(4, course.getCourseId());
                int affected = pstmt.executeUpdate();
                log.info("Course updated successfully: {}", course.getTitle());
                return affected > 0;
            }
        } catch (SQLException e) {
            log.error("Error updating course", e);
            return false;
        }
    }

    public boolean deleteCourse(int courseId) {
        String sql = "DELETE FROM course WHERE course_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return false;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, courseId);
                int affected = pstmt.executeUpdate();
                log.info("Course deleted successfully: ID {}", courseId);
                return affected > 0;
            }
        } catch (SQLException e) {
            log.error("Error deleting course", e);
            return false;
        }
    }
}