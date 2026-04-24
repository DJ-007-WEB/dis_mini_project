-- Audit and Consistency Migration
USE course_management_db;

-- 1. Ensure at least one instructor exists for consistency
INSERT IGNORE INTO instructor (instructor_id, name, phone, email) 
VALUES (1, 'Dr. Default Instructor', '9998887776', 'instructor@lms.com');

-- 2. Create Audit Log Table for Courses (Database Effect Demonstration)
CREATE TABLE IF NOT EXISTS course_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    action_type VARCHAR(20), -- INSERT, UPDATE, DELETE
    old_title VARCHAR(100),
    new_title VARCHAR(100),
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Triggers for Course Table

-- Trigger for INSERT
DROP TRIGGER IF EXISTS after_course_insert;
DELIMITER //
CREATE TRIGGER after_course_insert
AFTER INSERT ON course
FOR EACH ROW
BEGIN
    INSERT INTO course_logs (course_id, action_type, new_title)
    VALUES (NEW.course_id, 'INSERT', NEW.title);
END //
DELIMITER ;

-- Trigger for UPDATE
DROP TRIGGER IF EXISTS after_course_update;
DELIMITER //
CREATE TRIGGER after_course_update
AFTER UPDATE ON course
FOR EACH ROW
BEGIN
    INSERT INTO course_logs (course_id, action_type, old_title, new_title)
    VALUES (NEW.course_id, 'UPDATE', OLD.title, NEW.title);
END //
DELIMITER ;

-- Trigger for DELETE
DROP TRIGGER IF EXISTS after_course_delete;
DELIMITER //
CREATE TRIGGER after_course_delete
AFTER DELETE ON course
FOR EACH ROW
BEGIN
    INSERT INTO course_logs (course_id, action_type, old_title)
    VALUES (OLD.course_id, 'DELETE', OLD.title);
END //
DELIMITER ;
