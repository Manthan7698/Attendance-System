package com.example.attendance.service;

import com.example.attendance.dto.AttendanceSummaryDTO;
// Ensure the Attendance class exists in the specified package and is spelled correctly
import com.example.attendance.model.Attendance;
import com.example.attendance.model.Student;
import com.example.attendance.repository.AttendanceRepository;
import com.example.attendance.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    // Mark attendance for a student on a specific date
    // (Removed duplicate method)

    // Get attendance for a student by date
    public List<Attendance> getAttendanceByStudentAndDate(Long studentId, LocalDate date) {
        return attendanceRepository.findByStudentIdAndDate(studentId, date);
    }

    // Get all attendance for a student
    public List<Attendance> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    // Get all attendance on a date
    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }


    
    
    @Autowired
    private StudentRepository studentRepository;
    // Mark attendance for a student
    public Attendance markAttendance(Attendance attendance) {
        Long studentId = attendance.getStudent().getId();
        Student student = studentRepository.findById(studentId)
                          .orElseThrow(() -> new RuntimeException("Student not found"));
        attendance.setStudent(student); // attach full student object
        return attendanceRepository.save(attendance);
    }

// Removed duplicate getAttendanceSummary(Long studentId) method to resolve compilation error.
    public AttendanceSummaryDTO getAttendanceSummary(Long studentId) {
        long total = attendanceRepository.countByStudentId(studentId);
        long present = attendanceRepository.countByStudentIdAndStatus(studentId, "Present");

        double percentage = total == 0 ? 0.0 : (present * 100.0) / total;

        return new AttendanceSummaryDTO(studentId, total, present, percentage);
    }


}