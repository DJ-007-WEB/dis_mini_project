package com.course_management_system.model;
import lombok.AllArgsConstructor; import lombok.Data; import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class Assignment {
    private int assignId;
    private int courseId;
    private String title;
    private String desc;
}