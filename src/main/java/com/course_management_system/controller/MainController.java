package com.course_management_system.controller;

import com.course_management_system.model.*;
import com.course_management_system.service.StudentService;
import com.course_management_system.repository.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;

@WebServlet(urlPatterns = {
        "/viewStudents", "/addStudent", "/viewCourses", "/addLesson",
        "/enrollStudent", "/addInstructor", "/viewInstructors",
        "/addAssignment", "/viewAssignments", "/addQuestion", "/viewQuestions"
})
public class MainController extends HttpServlet {
    private StudentService studentService = new StudentService();
    private CourseRepository courseRepo = new CourseRepository();
    private LessonRepository lessonRepo = new LessonRepository();
    private InstructorRepository instructorRepo = new InstructorRepository();
    private AssignmentRepository assignRepo = new AssignmentRepository();
    private QuestionRepository questionRepo = new QuestionRepository();
    private CertificateRepository certRepo = new CertificateRepository();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getServletPath();

        if (path.equals("/viewStudents")) {
            request.setAttribute("students", studentService.getAllStudents());
            request.getRequestDispatcher("/views/student-list.jsp").forward(request, response);
        } else if (path.equals("/viewCourses")) {
            request.setAttribute("courses", courseRepo.getAllCourses());
            request.getRequestDispatcher("/views/course-list.jsp").forward(request, response);
        } else if (path.equals("/viewInstructors")) {
            request.setAttribute("instructors", instructorRepo.getAllInstructors());
            request.getRequestDispatcher("/views/instructor-list.jsp").forward(request, response);
        } else if (path.equals("/viewAssignments")) {
            int cId = Integer.parseInt(request.getParameter("courseId"));
            request.setAttribute("assignments", assignRepo.getAssignmentsByCourse(cId));
            request.getRequestDispatcher("/views/assignment-list.jsp").forward(request, response);
        } else if (path.equals("/viewQuestions")) {
            int aId = Integer.parseInt(request.getParameter("assignId"));
            request.setAttribute("questions", questionRepo.getQuestionsByAssignment(aId));
            request.getRequestDispatcher("/views/question-list.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getServletPath();

        if (path.equals("/addStudent")) {
            Student s = new Student(0, request.getParameter("name"), request.getParameter("phone"), request.getParameter("email"));
            studentService.registerStudent(s);
            response.sendRedirect("viewStudents");
        } else if (path.equals("/addInstructor")) {
            Instructor i = new Instructor(0, request.getParameter("name"), request.getParameter("email"));
            instructorRepo.addInstructor(i);
            response.sendRedirect("viewInstructors");
        } else if (path.equals("/addAssignment")) {
            Assignment a = new Assignment(0, Integer.parseInt(request.getParameter("courseId")), request.getParameter("title"), request.getParameter("desc"));
            assignRepo.addAssignment(a);
            response.sendRedirect("viewAssignments?courseId=" + request.getParameter("courseId"));
        } else if (path.equals("/addQuestion")) {
            Question q = new Question(0, Integer.parseInt(request.getParameter("assignId")), request.getParameter("qnText"),
                    request.getParameter("a"), request.getParameter("b"), request.getParameter("c"),
                    request.getParameter("d"), request.getParameter("correctOption"));
            questionRepo.addQuestion(q);
            response.sendRedirect("viewQuestions?assignId=" + request.getParameter("assignId"));
        } else if (path.equals("/addLesson")) {
            int courseId = Integer.parseInt(request.getParameter("courseId"));
            lessonRepo.addLesson(courseId, request.getParameter("title"), request.getParameter("desc"), request.getParameter("url"));
            response.sendRedirect("viewCourses");
        }
    }
}