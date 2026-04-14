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

    /**
     * Fetches all students from the database.
     * @return List of Students
     */
    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT student_id, name, phone, email FROM student";

        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return students;
            }
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(sql)) {
                while (rs.next()) {
                    students.add(new Student(
                            rs.getInt("student_id"),
                            rs.getString("name"),
                            rs.getString("phone"),
                            rs.getString("email")
                    ));
                }
                log.info("Successfully fetched {} students", students.size());
            }
        } catch (SQLException e) {
            log.error("Error fetching students from database", e);
        }
        return students;
    }

    /**
     * Adds a new student to the database.
     * Uses PreparedStatement to prevent SQL Injection.
     * @param student The student to add
     */
    public void addStudent(Student student) {
        String sql = "INSERT INTO student (name, phone, email) VALUES (?, ?, ?)";

        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null, cannot add student");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, student.getName());
                pstmt.setString(2, student.getPhone());
                pstmt.setString(3, student.getEmail());
                
                int affectedRows = pstmt.executeUpdate();
                if (affectedRows > 0) {
                    log.info("Student added successfully: {}", student.getName());
                } else {
                    log.warn("No rows affected while adding student: {}", student.getName());
                }
            }
        } catch (SQLException e) {
            log.error("Error adding student: {}", student.getName(), e);
        }
    }
}