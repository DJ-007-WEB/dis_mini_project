<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head><title>Add Instructor</title></head>
<body>
<h1>Add Instructor</h1>
<form action="addInstructor" method="post">
    Name: <input type="text" name="name" required/><br/>
    Email: <input type="email" name="email" required/><br/>
    <button type="submit">Add</button>
</form>
<a href="viewInstructors">Back to Instructors</a>
</body>
</html>
