package com.course_management_system.repository;

import com.course_management_system.model.Question;
import com.course_management_system.util.DBConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository class for managing Question data.
 * Improved with SLF4J logging and PreparedStatement.
 */
public class QuestionRepository {

    private static final Logger log = LoggerFactory.getLogger(QuestionRepository.class);

    public void addQuestion(Question q) {
        String sql = "INSERT INTO questions (assign_id, qn_text, a, b, c, d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, q.getAssignId());
                pstmt.setString(2, q.getQnText());
                pstmt.setString(3, q.getA());
                pstmt.setString(4, q.getB());
                pstmt.setString(5, q.getC());
                pstmt.setString(6, q.getD());
                pstmt.setString(7, q.getCorrectOption());
                pstmt.executeUpdate();
                log.info("Question added successfully to assignment ID: {}", q.getAssignId());
            }
        } catch (SQLException e) {
            log.error("Error adding question to assignment ID: {}", q.getAssignId(), e);
        }
    }

    public List<Question> getQuestionsByAssignment(int assignId) {
        List<Question> list = new ArrayList<>();
        String sql = "SELECT * FROM questions WHERE assign_id = ?";
        try (Connection conn = DBConnection.getConnection()) {
            if (conn == null) {
                log.error("Database connection is null");
                return list;
            }
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setInt(1, assignId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    while (rs.next()) {
                        list.add(new Question(
                            rs.getInt("qn_id"), 
                            rs.getInt("assign_id"), 
                            rs.getString("qn_text"),
                            rs.getString("a"), 
                            rs.getString("b"), 
                            rs.getString("c"),
                            rs.getString("d"), 
                            rs.getString("correct_option")
                        ));
                    }
                }
                log.info("Fetched {} questions for assignment ID: {}", list.size(), assignId);
            }
        } catch (SQLException e) {
            log.error("Error fetching questions for assignment ID: {}", assignId, e);
        }
        return list;
    }
}