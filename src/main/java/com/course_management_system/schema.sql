CREATE DATABASE IF NOT EXISTS course_management_db;
USE course_management_db;

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
                         email VARCHAR(100)
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
                         less_url VARCHAR(255), -- Stores YouTube links
                         FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- 1. Assignment Header
CREATE TABLE assignments (
                             assign_id INT AUTO_INCREMENT PRIMARY KEY,
                             course_id INT,
                             title VARCHAR(100),
                             description TEXT,
                             FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- 2. Questions (MCQs)
CREATE TABLE questions (
                           qn_id INT AUTO_INCREMENT PRIMARY KEY,
                           assign_id INT,
                           qn_text TEXT,
                           a VARCHAR(255),
                           b VARCHAR(255),
                           c VARCHAR(255),
                           d VARCHAR(255),
                           correct_option VARCHAR(1), -- Store 'a', 'b', 'c', or 'd'
                           FOREIGN KEY (assign_id) REFERENCES assignments(assign_id)
);

CREATE TABLE enrollment (
                            enroll_id INT AUTO_INCREMENT PRIMARY KEY,
                            student_id INT,
                            course_id INT,
                            status VARCHAR(20) DEFAULT 'Ongoing',
                            FOREIGN KEY (student_id) REFERENCES student(student_id),
                            FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Certificates table for issued certificates
CREATE TABLE certificates (
                            cert_id INT AUTO_INCREMENT PRIMARY KEY,
                            student_id INT,
                            course_id INT,
                            issue_date DATETIME,
                            FOREIGN KEY (student_id) REFERENCES student(student_id),
                            FOREIGN KEY (course_id) REFERENCES course(course_id)
);