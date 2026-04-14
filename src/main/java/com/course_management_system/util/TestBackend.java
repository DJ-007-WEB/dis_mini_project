package com.course_management_system.util;

import com.course_management_system.model.Student;
import com.course_management_system.repository.StudentRepository;
import java.util.List;

public class TestBackend {
    public static void main(String[] args) {
        StudentRepository repo = new StudentRepository();

        // 1. Test adding a student
        Student s = new Student(0, "Test User", "9999999999", "test@pict.edu");
        repo.addStudent(s);
        System.out.println("Student Added successfully!");

        // 2. Test retrieving students
        List<Student> list = repo.getAllStudents();
        for(Student st : list) {
            System.out.println("Found Student: " + st.getName());
        }
    }
}
