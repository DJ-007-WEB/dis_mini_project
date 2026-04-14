package com.course_management_system.service;

import com.course_management_system.model.Assignment;
import com.course_management_system.model.Question;
import com.course_management_system.repository.AssignmentRepository;
import com.course_management_system.repository.QuestionRepository;
import java.util.List;

/**
 * Service class for Managing Assignments and Questions.
 */
public class AssignmentService {
    private final AssignmentRepository assignmentRepo = new AssignmentRepository();
    private final QuestionRepository questionRepo = new QuestionRepository();

    public List<Assignment> getAssignmentsForCourse(int courseId) {
        return assignmentRepo.getAssignmentsByCourse(courseId);
    }

    public List<Question> getQuestionsForAssignment(int assignmentId) {
        return questionRepo.getQuestionsByAssignment(assignmentId);
    }

    public void addAssignmentWithQuestions(Assignment a, List<Question> questions) {
        assignmentRepo.addAssignment(a);
        // Normally you'd get the generated ID here, but for simplicity:
        for (Question q : questions) {
            questionRepo.addQuestion(q);
        }
    }
}
