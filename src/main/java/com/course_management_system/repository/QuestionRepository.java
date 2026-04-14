package com.course_management_system.repository;
import com.course_management_system.model.Question;
import com.course_management_system.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class QuestionRepository {
    public void addQuestion(Question q) {
        String sql = "INSERT INTO questions (assign_id, qn_text, a, b, c, d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, q.getAssignId());
            pstmt.setString(2, q.getQnText());
            pstmt.setString(3, q.getA());
            pstmt.setString(4, q.getB());
            pstmt.setString(5, q.getC());
            pstmt.setString(6, q.getD());
            pstmt.setString(7, q.getCorrectOption());
            pstmt.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<Question> getQuestionsByAssignment(int assignId) {
        List<Question> list = new ArrayList<>();
        String sql = "SELECT * FROM questions WHERE assign_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, assignId);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                list.add(new Question(rs.getInt("qn_id"), rs.getInt("assign_id"), rs.getString("qn_text"),
                        rs.getString("a"), rs.getString("b"), rs.getString("c"),
                        rs.getString("d"), rs.getString("correct_option")));
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return list;
    }
}