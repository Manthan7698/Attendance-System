package com.example.attendance.dto;

public class AttendanceSummaryDTO {
    private Long studentId;
    private long totalDays;
    private long presentDays;
    private double attendancePercentage;

    public AttendanceSummaryDTO(Long studentId, long totalDays, long presentDays, double attendancePercentage) {
        this.studentId = studentId;
        this.totalDays = totalDays;
        this.presentDays = presentDays;
        this.attendancePercentage = attendancePercentage;
    }

    // Getters and setters
    public Long getStudentId() {
        return studentId;
    }
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    public long getTotalDays() {
        return totalDays;
    }
    public void setTotalDays(long totalDays) {
        this.totalDays = totalDays;
    }
    public long getPresentDays() {
        return presentDays;
    }
    public void setPresentDays(long presentDays) {
        this.presentDays = presentDays;
    }
    public double getAttendancePercentage() {
        return attendancePercentage;
    }
    public void setAttendancePercentage(double attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }
}