<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Students</title>
</head>
<body>
<h1>Students</h1>
<a href="/add-student.jsp">Add Student</a>
<table border="1">
    <tr><th>ID</th><th>Name</th><th>Phone</th><th>Email</th></tr>
    <c:forEach var="s" items="${students}">
        <tr>
            <td>${s.studentId}</td>
            <td>${s.name}</td>
            <td>${s.phone}</td>
            <td>${s.email}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
