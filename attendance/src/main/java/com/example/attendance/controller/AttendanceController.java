package com.example.attendance.controller;

import com.example.attendance.model.Attendance;
import com.example.attendance.service.AttendanceService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import com.example.attendance.dto.AttendanceSummaryDTO;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Mark attendance for a student
    @PostMapping("/mark")
    public ResponseEntity<Attendance> markAttendance(@Valid @RequestBody Attendance attendance) {
        Attendance saved = attendanceService.markAttendance(attendance);
        return ResponseEntity.ok(saved);
    }

    // Get attendance for a student on a specific date
    @GetMapping("/student/{studentId}/date/{date}")
    public List<Attendance> getAttendanceByStudentAndDate(
            @PathVariable Long studentId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return attendanceService.getAttendanceByStudentAndDate(studentId, date);
    }

    // Get all attendance for a student
    @GetMapping("/student/{studentId}")
    public List<Attendance> getAttendanceByStudent(@PathVariable Long studentId) {
        return attendanceService.getAttendanceByStudent(studentId);
    }

    // Get all attendance on a specific date
    @GetMapping("/date/{date}")
    public List<Attendance> getAttendanceByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return attendanceService.getAttendanceByDate(date);
    }

    @GetMapping("/student/{studentId}/summary")
    public AttendanceSummaryDTO getAttendanceSummary(@PathVariable Long studentId) {
        return attendanceService.getAttendanceSummary(studentId);
    }

    @GetMapping("/summary/{studentId}")
    public ResponseEntity<AttendanceSummaryDTO> getSummary(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.getAttendanceSummary(studentId));
    }

}