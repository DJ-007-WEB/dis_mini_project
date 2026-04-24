package com.course_management_system.controller;

import com.course_management_system.model.*;
import com.course_management_system.repository.*;
import com.course_management_system.dto.StudentDTO;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@WebServlet("/api/*")
public class ApiController extends HttpServlet {
    private final Gson gson = new Gson();
    private final CourseRepository courseRepo = new CourseRepository();
    private final StudentRepository studentRepo = new StudentRepository();
    private final EnrollmentRepository enrollmentRepo = new EnrollmentRepository();
    private final AdminRepository adminRepo = new AdminRepository();
    private final LessonRepository lessonRepo = new LessonRepository();
    private final AssignmentRepository assignmentRepo = new AssignmentRepository();
    private final QuestionRepository questionRepo = new QuestionRepository();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        try {
            if ("/courses".equals(pathInfo)) {
                List<Course> courses = courseRepo.getAllCourses();
                out.print(gson.toJson(courses));
            } else if ("/students".equals(pathInfo)) {
                List<Student> students = studentRepo.getAllStudents();
                out.print(gson.toJson(students));
            } else if ("/student/enrollCount".equals(pathInfo)) {
                int id = Integer.parseInt(req.getParameter("id"));
                int count = studentRepo.getEnrollmentCount(id);
                out.print("{\"count\": " + count + "}");
            } else if ("/student/enrolled".equals(pathInfo)) {
                int studentId = Integer.parseInt(req.getParameter("studentId"));
                List<Enrollment> enrollments = enrollmentRepo.getEnrollmentsByStudent(studentId);
                out.print(gson.toJson(enrollments));
            } else if ("/admin/reports/course".equals(pathInfo)) {
                int id = Integer.parseInt(req.getParameter("id"));
                // We'll call the procedure directly via JDBC
                try (java.sql.Connection conn = com.course_management_system.util.DBConnection.getConnection();
                     java.sql.CallableStatement cstmt = conn.prepareCall("{call GetCourseReport(?)}")) {
                    cstmt.setInt(1, id);
                    try (java.sql.ResultSet rs = cstmt.executeQuery()) {
                        if (rs.next()) {
                            Map<String, Object> report = new HashMap<>();
                            report.put("title", rs.getString(1));
                            report.put("enrollments", rs.getInt(2));
                            report.put("total_students", rs.getInt(3));
                            out.print(gson.toJson(report));
                        }
                    }
                }
            } else if ("/lessons".equals(pathInfo)) {
                int courseId = Integer.parseInt(req.getParameter("courseId"));
                List<Lesson> lessons = lessonRepo.getLessonsByCourseId(courseId);
                out.print(gson.toJson(lessons));
            } else if ("/assignments".equals(pathInfo)) {
                int courseId = Integer.parseInt(req.getParameter("courseId"));
                List<Assignment> assignments = assignmentRepo.getAssignmentsByCourse(courseId);
                out.print(gson.toJson(assignments));
            } else if ("/questions".equals(pathInfo)) {
                int assignId = Integer.parseInt(req.getParameter("assignId"));
                List<Question> questions = questionRepo.getQuestionsByAssignment(assignId);
                out.print(gson.toJson(questions));
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
        }
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        
        try {
            if ("/login".equals(pathInfo)) {
                Map<String, String> creds = gson.fromJson(body, new TypeToken<Map<String, String>>(){}.getType());
                Student s = studentRepo.authenticate(creds.get("email"), creds.get("password"));
                if (s != null) {
                    List<Integer> enrolledIds = studentRepo.getEnrolledCourseIds(s.getStudentId());
                    StudentDTO dto = com.course_management_system.dto.StudentDTO.fromStudent(s, enrolledIds);
                    out.print(gson.toJson(dto));
                }
                else resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            } else if ("/admin/login".equals(pathInfo)) {
                Map<String, String> creds = gson.fromJson(body, new TypeToken<Map<String, String>>(){}.getType());
                Admin a = adminRepo.authenticate(creds.get("email"), creds.get("password"));
                if (a != null) out.print(gson.toJson(a));
                else resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            } else if ("/signup".equals(pathInfo)) {
                Student s = gson.fromJson(body, Student.class);
                if (studentRepo.addStudent(s)) out.print("{\"message\": \"Success\"}");
                else resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            } else if ("/courses".equals(pathInfo)) {
                Course c = gson.fromJson(body, Course.class);
                if (courseRepo.addCourse(c)) {
                    resp.setStatus(HttpServletResponse.SC_CREATED);
                    out.print("{\"message\": \"Course added successfully\"}");
                } else {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    out.print("{\"error\": \"Failed to add course. Please check database constraints.\"}");
                }
            } else if ("/enroll".equals(pathInfo)) {
                Enrollment e = gson.fromJson(body, Enrollment.class);
                enrollmentRepo.enrollStudent(e);
                // Return updated list of IDs
                List<Integer> updatedIds = studentRepo.getEnrolledCourseIds(e.getStudentId());
                out.print(gson.toJson(updatedIds));
            }
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

        try {
            if ("/courses".equals(pathInfo)) {
                Course c = gson.fromJson(body, Course.class);
                if (courseRepo.updateCourse(c)) out.print("{\"message\": \"Updated\"}");
                else resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            } else if ("/students".equals(pathInfo)) {
                Student s = gson.fromJson(body, Student.class);
                if (studentRepo.updateStudent(s)) out.print("{\"message\": \"Updated\"}");
                else resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (Exception e) {
            resp.setStatus(500);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        int id = Integer.parseInt(req.getParameter("id"));

        try {
            if ("/courses".equals(pathInfo)) {
                if (courseRepo.deleteCourse(id)) out.print("{\"message\": \"Deleted\"}");
                else resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            } else if ("/students".equals(pathInfo)) {
                if (studentRepo.deleteStudent(id)) out.print("{\"message\": \"Deleted\"}");
                else resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (Exception e) {
            resp.setStatus(500);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
