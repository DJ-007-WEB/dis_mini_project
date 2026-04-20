package com.course_management_system.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class Question {
    private int qnId;
    private int assignId;
    private String qnText;
    private String a, b, c, d;
    private String correctOption;
}
