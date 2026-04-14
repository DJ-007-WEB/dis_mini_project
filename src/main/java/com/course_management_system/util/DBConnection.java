package com.course_management_system.util;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {
    private static final Logger log = LoggerFactory.getLogger(DBConnection.class);
    private static HikariDataSource dataSource;

    static {
        try {
            Properties props = new Properties();
            try (InputStream is = DBConnection.class.getClassLoader().getResourceAsStream("application.properties")) {
                if (is != null) props.load(is);
            } catch (Exception ex) {
                log.warn("Could not load application.properties from classpath, using defaults.", ex);
            }

            String url = props.getProperty("db.url", "jdbc:mysql://localhost:3306/course_management_db");
            String user = props.getProperty("db.user", "root");
            String pass = props.getProperty("db.password", "password");

            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(url);
            config.setUsername(user);
            config.setPassword(pass);
            config.setMaximumPoolSize(Integer.parseInt(props.getProperty("db.pool.size", "10")));
            config.setPoolName("cms-hikari-pool");
            config.addDataSourceProperty("cachePrepStmts", "true");
            config.addDataSourceProperty("prepStmtCacheSize", "250");
            config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");

            dataSource = new HikariDataSource(config);
            log.info("HikariCP initialized with URL={}", url);
        } catch (Exception e) {
            log.error("Failed to initialize HikariCP DataSource", e);
        }
    }

    public static Connection getConnection() {
        try {
            if (dataSource == null) {
                throw new SQLException("DataSource not initialized");
            }
            return dataSource.getConnection();
        } catch (SQLException e) {
            log.error("Failed to get DB Connection", e);
            return null;
        }
    }

    public static void shutdown() {
        if (dataSource != null) dataSource.close();
    }
}