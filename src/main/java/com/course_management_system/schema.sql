CREATE DATABASE IF NOT EXISTS course_management_db;
USE course_management_db;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS enrollment_logs;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS course_logs;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS instructor;
DROP TABLE IF EXISTS admin;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE instructor (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100)
);

CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100),
    password VARCHAR(255)
);

CREATE TABLE course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id)
);

CREATE TABLE lessons (
    less_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(100),
    description TEXT,
    less_url VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

CREATE TABLE assignments (
    assign_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    title VARCHAR(100),
    description TEXT,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

CREATE TABLE questions (
    qn_id INT AUTO_INCREMENT PRIMARY KEY,
    assign_id INT,
    qn_text TEXT,
    a VARCHAR(255),
    b VARCHAR(255),
    c VARCHAR(255),
    d VARCHAR(255),
    correct_option VARCHAR(1),
    FOREIGN KEY (assign_id) REFERENCES assignments(assign_id) ON DELETE CASCADE
);

CREATE TABLE enrollment (
    enroll_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enroll_date VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Ongoing',
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

CREATE TABLE certificates (
    cert_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    issue_date DATETIME,
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

-- Admin table for dedicated admin login
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

-- Part –A: SQL and PL/SQL, Triggers, Stored Procedures, Functions

-- 1. Stored Procedure: Get a summary report for a specific course
DELIMITER //
CREATE PROCEDURE GetCourseReport(IN c_id INT)
BEGIN
    SELECT 
        c.title, 
        COUNT(e.enroll_id) as total_enrollments,
        (SELECT COUNT(*) FROM student) as total_students_system
    FROM course c
    LEFT JOIN enrollment e ON c.course_id = e.course_id
    WHERE c.course_id = c_id
    GROUP BY c.course_id;
END //
DELIMITER ;

-- 2. Audit Trial Setup
CREATE TABLE course_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    action_type VARCHAR(20), -- INSERT, UPDATE, DELETE
    old_title VARCHAR(100),
    new_title VARCHAR(100),
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollment_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Triggers for Course Table (Audit Trial)
DELIMITER //
CREATE TRIGGER after_course_insert
AFTER INSERT ON course
FOR EACH ROW
BEGIN
    INSERT INTO course_logs (course_id, action_type, new_title)
    VALUES (NEW.course_id, 'INSERT', NEW.title);
END //

CREATE TRIGGER after_course_update
AFTER UPDATE ON course
FOR EACH ROW
BEGIN
    INSERT INTO course_logs (course_id, action_type, old_title, new_title)
    VALUES (NEW.course_id, 'UPDATE', OLD.title, NEW.title);
END //

CREATE TRIGGER after_course_delete
AFTER DELETE ON course
FOR EACH ROW
BEGIN
    INSERT INTO course_logs (course_id, action_type, old_title)
    VALUES (OLD.course_id, 'DELETE', OLD.title);
END //

-- 4. Trigger for Enrollment Table
CREATE TRIGGER after_enrollment_insert
AFTER INSERT ON enrollment
FOR EACH ROW
BEGIN
    INSERT INTO enrollment_logs (student_id, course_id)
    VALUES (NEW.student_id, NEW.course_id);
END //
DELIMITER ;

-- 5. Function: Calculate the total number of enrollments for a student
DELIMITER //
CREATE FUNCTION GetStudentEnrollmentCount(s_id INT) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM enrollment WHERE student_id = s_id;
    RETURN total;
END //
DELIMITER ;

-- Insert initial admin
INSERT INTO admin (name, email, password) VALUES ('Main Admin', 'admin@lms.com', 'admin123');

-- Insert initial instructor (Required for course creation)
INSERT INTO instructor (name, phone, email) VALUES ('Dr. Smith', '1234567890', 'smith@lms.com');

-- Insert initial student for testing
INSERT INTO student (name, phone, email, password) VALUES ('Test Student', '9876543210', 'student@test.com', 'pass123');