package com.course_management_system.service;

import com.course_management_system.model.Course;
import com.course_management_system.repository.CourseRepository;
import java.util.List;

/**
 * Service class for Managing Courses.
 */
public class CourseService {
    private final CourseRepository courseRepo = new CourseRepository();

    public List<Course> getAllCourses() {
        return courseRepo.getAllCourses();
    }

    public void createCourse(Course course) {
        // Validation: Ensure title is not empty
        if (course.getTitle() != null && !course.getTitle().trim().isEmpty()) {
            courseRepo.addCourse(course);
        }
    }
}
