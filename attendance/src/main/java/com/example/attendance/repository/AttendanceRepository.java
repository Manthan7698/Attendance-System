package com.example.attendance.repository;

// Ensure this import matches the actual package of Attendance
import com.example.attendance.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    long countByStudentId(Long studentId);

    long countByStudentIdAndStatus(Long studentId, String status);


    // Find attendance records by student ID and date
    List<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);

    // Find all attendance for a student
    List<Attendance> findByStudentId(Long studentId);

    // Find all attendance on a specific date
    List<Attendance> findByDate(LocalDate date);
}