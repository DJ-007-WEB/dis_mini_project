USE course_management_db;

-- Clear existing sample data to prevent duplicates (optional but safe for a 'reset' pass)
DELETE FROM questions;
DELETE FROM assignments;
DELETE FROM lessons;

-- Insert Lessons for 'backend using java' (Course ID: 1)
INSERT INTO lessons (course_id, title, description, less_url) VALUES 
(1, 'Introduction to Java Syntax', 'Learn the basics of variables, loops, and conditions.', 'https://example.com/java-1'),
(1, 'Object Oriented Programming', 'Classes, Objects, Inheritance, and Interfaces explained.', 'https://example.com/java-2'),
(1, 'Database Connectivity with JDBC', 'Connecting your Java app to MySQL database.', 'https://example.com/java-3');

-- Insert Lessons for 'ml using python' (Course ID: 2)
INSERT INTO lessons (course_id, title, description, less_url) VALUES 
(2, 'Python for Data Science', 'Numpy, Pandas, and Matplotlib basics.', 'https://example.com/ml-1'),
(2, 'Linear Regression Explained', 'Mathematical foundation and implementation.', 'https://example.com/ml-2'),
(2, 'Neural Networks Foundation', 'Understanding backpropagation and weights.', 'https://example.com/ml-3');

-- Insert Assignments for Course 1
INSERT INTO assignments (course_id, title, description) VALUES 
(1, 'Java Fundamentals Quiz', 'Test your knowledge on basic Java syntax.'),
(1, 'OOP Advanced Concepts', 'Test your understanding of Inheritance and Polymorphism.');

-- Insert Questions for Assignment 1 (Java Quiz)
INSERT INTO questions (assign_id, qn_text, a, b, c, d, correct_option) VALUES 
(1, 'Which keyword is used to create a class in Java?', 'struct', 'def', 'class', 'v-text', 'C'),
(1, 'What is the default value of an int variable?', '0', 'null', '1', 'undefined', 'A');

-- Insert Questions for Assignment 2 (OOP Quiz)
INSERT INTO questions (assign_id, qn_text, a, b, c, d, correct_option) VALUES 
(2, 'Which concept refers to wrapping data and methods into a single unit?', 'Polymorphism', 'Encapsulation', 'Inheritance', 'Abstraction', 'B'),
(2, 'Can we create an object of an Abstract class?', 'Yes', 'No', 'Sometimes', 'Only in Java 17', 'B');

-- Insert Assignments for Course 2
INSERT INTO assignments (course_id, title, description) VALUES 
(2, 'Python Data Science Quiz', 'Check your readiness for ML.'),
(2, 'ML Algorithms Quiz', 'Core concepts of supervised learning.');

-- Insert Questions for Assignment 3 (Python Quiz)
INSERT INTO questions (assign_id, qn_text, a, b, c, d, correct_option) VALUES 
(3, 'Which library is used for matrix operations in Python?', 'Pandas', 'Flask', 'Numpy', 'Requests', 'C'),
(3, 'What is the correct way to define a list?', '[]', '{}', '()', '<>', 'A');

-- Insert Questions for Assignment 4 (ML Quiz)
INSERT INTO questions (assign_id, qn_text, a, b, c, d, correct_option) VALUES 
(4, 'What does SVM stand for?', 'Simple Vector Machine', 'Support Vector Machine', 'System Velocity Method', 'Supervised Value Model', 'B'),
(4, 'Linear regression is which type of learning?', 'Unsupervised', 'Reinforcement', 'Supervised', 'Neural', 'C');
