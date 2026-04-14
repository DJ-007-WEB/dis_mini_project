<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Instructors</title>
</head>
<body>
<h1>Instructors</h1>
<a href="/add-instructor.jsp">Add Instructor</a>
<table border="1">
    <tr><th>ID</th><th>Name</th><th>Email</th></tr>
    <c:forEach var="i" items="${instructors}">
        <tr>
            <td>${i.instructorId}</td>
            <td>${i.name}</td>
            <td>${i.email}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
