package com.course_management_system.service;

import com.course_management_system.model.Student;
import com.course_management_system.repository.StudentRepository;
import java.util.List;

public class StudentService {
    private StudentRepository studentRepo = new StudentRepository();

    public List<Student> getAllStudents() {
        return studentRepo.getAllStudents();
    }

    public void registerStudent(Student s) {
        // Business Logic: You could add email validation here
        if (s.getEmail() != null && s.getEmail().contains("@")) {
            studentRepo.addStudent(s);
        }
    }
}