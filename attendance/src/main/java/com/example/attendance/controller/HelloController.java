package com.example.attendance.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "Hello! Welcome to the Attendance Management System!";
    }
}
// This controller handles the root endpoint and returns a welcome message.