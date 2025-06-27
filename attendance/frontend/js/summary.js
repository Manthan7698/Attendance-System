import { fetchStudents, fetchAttendanceSummary } from './api.js';

const studentSelect = document.getElementById('studentSelect');
const summaryResult = document.getElementById('summaryResult');
const getSummaryBtn = document.getElementById('getSummaryBtn');

async function loadStudents() {
  try {
    const students = await fetchStudents();
    students.forEach(student => {
      const option = document.createElement('option');
      option.value = student.id;
      option.textContent = student.name;
      studentSelect.appendChild(option);
    });
  } catch (error) {
    alert('Failed to load students: ' + error.message);
  }
}

async function showSummary() {
  const studentId = studentSelect.value;
  if (!studentId) {
    alert('Please select a student');
    return;
  }

  try {
    const summary = await fetchAttendanceSummary(studentId);
    summaryResult.innerHTML = `
      <div class="summary-card">
        <div class="summary-title">Attendance Summary</div>
        <div class="summary-stats">
          <div class="summary-stat">
            <div class="summary-stat-label">Total Days</div>
            <div class="summary-stat-value">${summary.totalDays}</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-label">Present Days</div>
            <div class="summary-stat-value">${summary.presentDays}</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-label">Attendance %</div>
            <div class="summary-stat-value">${summary.attendancePercentage.toFixed(2)}%</div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    summaryResult.textContent = 'Failed to load summary: ' + error.message;
  }
}

getSummaryBtn.addEventListener('click', showSummary);

// Load students on page load
loadStudents();
