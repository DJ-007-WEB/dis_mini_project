package com.course_management_system.model;
import lombok.AllArgsConstructor; import lombok.Data; import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class Certificate {
    private int certId;
    private int studentId;
    private int courseId;
    private String issueDate;
}
