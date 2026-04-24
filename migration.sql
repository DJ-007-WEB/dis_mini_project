-- Final Migration script to add Admin features and PL/SQL blocks
USE course_management_db;

-- Admin table for dedicated admin login
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

-- Part –A: SQL and PL/SQL, Triggers, Stored Procedures, Functions

-- 1. Stored Procedure: Get a summary report for a specific course
DROP PROCEDURE IF EXISTS GetCourseReport;
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

-- 2. Trigger: Automatically log enrollment activity (Audit Trial)
CREATE TABLE IF NOT EXISTS enrollment_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS after_enrollment_insert;
DELIMITER //
CREATE TRIGGER after_enrollment_insert
AFTER INSERT ON enrollment
FOR EACH ROW
BEGIN
    INSERT INTO enrollment_logs (student_id, course_id)
    VALUES (NEW.student_id, NEW.course_id);
END //
DELIMITER ;

-- 3. Function: Calculate the total number of enrollments for a student
DROP FUNCTION IF EXISTS GetStudentEnrollmentCount;
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

-- Insert initial admin if not exists
INSERT IGNORE INTO admin (name, email, password) VALUES ('Main Admin', 'admin@lms.com', 'admin123');
