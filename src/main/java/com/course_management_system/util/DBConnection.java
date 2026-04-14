package com.course_management_system.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static Connection connection = null;

    // These will be updated once your friend pushes the MySQL details
    private static final String URL = "jdbc:mysql://localhost:3306/course_management_db";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public static Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                Class.forName("com.mysql.cj.jdbc.Driver");
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
            }
        } catch (ClassNotFoundException e) {
            System.err.println("JDBC Driver not found!");
        } catch (SQLException e) {
            System.err.println("❌ Connection Failed! Check your Username/Password/DB Name.");
            System.err.println("Error: " + e.getMessage());
        }
        return connection;
    }
}