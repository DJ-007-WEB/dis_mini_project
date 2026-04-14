<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head><title>Add Student</title></head>
<body>
<h1>Add Student</h1>
<form action="addStudent" method="post">
    Name: <input type="text" name="name" required/><br/>
    Phone: <input type="text" name="phone"/><br/>
    Email: <input type="email" name="email" required/><br/>
    <button type="submit">Add</button>
</form>
<a href="viewStudents">Back to Students</a>
</body>
</html>
