Project: Course Management System (LMS)

Quick setup & DB instructions

1. Install MySQL and create the database by running the schema file:

```bash
# From project root (adjust path if needed)
mysql -u root -p < src/main/java/com/course_management_system/schema.sql
```

2. Update DB credentials in `src/main/resources/application.properties`:

```
db.url=jdbc:mysql://localhost:3306/course_management_db
db.user=root
db.password=your_password_here
```

3. Build the project (requires Maven):

```bash
mvn package
```

4. Run the simple test runner `TestBackend` to verify DB connectivity (from your IDE or via Maven exec):

```bash
mvn -Dexec.mainClass="com.course_management_system.util.TestBackend" org.codehaus.mojo:exec-maven-plugin:3.1.0:exec
```

5. Deploy `target/LMS_Project.war` to a servlet container (Tomcat) or run via your IDE.

Notes & next tasks
- If `mvn` is not available on your machine, install Maven or run the Java classes from your IDE.
- I updated `DBConnection` to read DB properties from `application.properties`.
- I synced repository SQL with `schema.sql` and added the `certificates` table and `instructor.phone` column.
- Next I can add logging, run the TestBackend here (if you want, provide DB credentials or allow me to run maven), and help deploy to Tomcat.
