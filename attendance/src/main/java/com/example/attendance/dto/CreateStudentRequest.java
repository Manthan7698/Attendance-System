package com.example.attendance.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateStudentRequest {
    @NotBlank(message = "Student name cannot be blank")
    private String name;

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Roll number is required")
    private String rollNumber;

    @NotBlank(message = "Course is required")
    private String course;

    @PastOrPresent(message = "Registration date must be today or earlier")
    @NotNull(message = "Registration date is required")
    private LocalDate registrationDate;
} 