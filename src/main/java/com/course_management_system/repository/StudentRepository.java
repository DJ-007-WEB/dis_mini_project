package com.course_management_system.repository;

import com.course_management_system.model.Student;
import com.course_management_system.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentRepository {

    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT * FROM student";
        Connection conn = DBConnection.getConnection();

        if (conn == null) {
            System.err.println("❌ Cannot fetch students: Database connection is null.");
            return students; // Return empty list instead of crashing
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
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return students;
    }

    // This fixes the error in your MainController
    public void addStudent(Student student) {
        String sql = "INSERT INTO student (name, phone, email) VALUES (?, ?, ?)";
        Connection conn = DBConnection.getConnection();

        // Add this check to prevent the NullPointerException crash
        if (conn == null) {
            System.err.println("❌ Could not add student because Database Connection is NULL.");
            return;
        }

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, student.getName());
            pstmt.setString(2, student.getPhone());
            pstmt.setString(3, student.getEmail());
            pstmt.executeUpdate();
            System.out.println("✅ Student added successfully!");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}