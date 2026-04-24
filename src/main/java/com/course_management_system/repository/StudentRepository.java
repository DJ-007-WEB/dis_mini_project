package com.course_management_system.repository;

import com.course_management_system.model.Student;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository class for managing Student data in the database.
 * Improved for scalability, security (SQL Injection prevention), and clarity.
 */
public class StudentRepository {

    private static final Logger log = LoggerFactory.getLogger(StudentRepository.class);

    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT student_id, name, phone, email, password FROM student";

        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return students;
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)) {
                while (rs.next()) {
                    students.add(new Student(
                            rs.getInt("student_id"),
                            rs.getString("name"),
                            rs.getString("phone"),
                            rs.getString("email"),
                            rs.getString("password")
                    ));
                }
            }
        } catch (SQLException e) {
            log.error("Error fetching students", e);
        }
        return students;
    }

    public boolean addStudent(Student student) {
        String sql = "INSERT INTO student (name, phone, email, password) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return false;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, student.getName());
                pstmt.setString(2, student.getPhone());
                pstmt.setString(3, student.getEmail());
                pstmt.setString(4, student.getPassword());
                return pstmt.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            log.error("Error adding student", e);
            return false;
        }
    }

    public boolean updateStudent(Student student) {
        String sql = "UPDATE student SET name = ?, phone = ?, email = ? WHERE student_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return false;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, student.getName());
                pstmt.setString(2, student.getPhone());
                pstmt.setString(3, student.getEmail());
                pstmt.setInt(4, student.getStudentId());
                return pstmt.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            log.error("Error updating student", e);
            return false;
        }
    }

    public boolean deleteStudent(int studentId) {
        String sql = "DELETE FROM student WHERE student_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return false;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, studentId);
                return pstmt.executeUpdate() > 0;
            }
        } catch (SQLException e) {
            log.error("Error deleting student", e);
            return false;
        }
    }

    public Student authenticate(String email, String password) {
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return null;
            String sql = "SELECT * FROM student WHERE email = ? AND password = ?";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, email);
                pstmt.setString(2, password);
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        return new Student(
                                rs.getInt("student_id"),
                                rs.getString("name"),
                                rs.getString("phone"),
                                rs.getString("email"),
                                rs.getString("password")
                        );
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Authentication error", e);
        }
        return null;
    }

    public List<Integer> getEnrolledCourseIds(int studentId) {
        List<Integer> ids = new ArrayList<>();
        String sql = "SELECT course_id FROM enrollment WHERE student_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return ids;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, studentId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    while (rs.next()) {
                        ids.add(rs.getInt("course_id"));
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Error fetching enrolled course IDs", e);
        }
        return ids;
    }

    /**
     * Uses a MySQL Function to get enrollment count.
     * Demonstrates requirement: 'Use stored procedure, trigger and functions'.
     */
    public int getEnrollmentCount(int studentId) {
        String sql = "SELECT GetStudentEnrollmentCount(?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) return 0;
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, studentId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) return rs.getInt(1);
                }
            }
        } catch (SQLException e) {
            log.error("Error calling function GetStudentEnrollmentCount", e);
        }
        return 0;
    }
}