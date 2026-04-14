package com.course_management_system.model;

import lombok.AllArgsConstructor; import lombok.Data; import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class Instructor {
    private int instructorId;
    private String name;
    private String phone;
    private String email;
    public Instructor(int instructorId, String name, String email) {
        this.instructorId = instructorId;
        this.name = name;
        this.email = email;
    }
}
