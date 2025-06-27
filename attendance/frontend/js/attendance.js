// attendance.js

import { getData, postData } from './api.js';

// Get DOM elements
const studentSelect = document.getElementById('studentSelect');
const dateInput = document.getElementById('dateInput');
const attendanceForm = document.getElementById('attendanceForm');
const statusSelect = document.getElementById('statusSelect');
const remarksInput = document.getElementById('remarksInput');
const resultMessage = document.getElementById('resultMessage');

// Set default date input value to today (yyyy-mm-dd)
function setTodayDate() {
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
}

// Fetch students from backend and populate the select dropdown
async function loadStudents() {
  try {
    const students = await getData('/students');

    // Clear existing options except first default one
    studentSelect.innerHTML = '<option value="">Select student</option>';

    // Add students as options
    students.forEach(student => {
      const option = document.createElement('option');
      option.value = student.id;
      option.textContent = `${student.name} (${student.rollNumber})`;
      studentSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading students:', error);
    resultMessage.textContent = 'Error loading students. Please try again later.';
    resultMessage.style.color = 'red';
  }
}

// Handle form submission
attendanceForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate student selected
  if (!studentSelect.value) {
    resultMessage.textContent = 'Please select a student.';
    resultMessage.style.color = 'red';
    return;
  }

  // Create attendance payload
  const attendanceData = {
    student: { id: Number(studentSelect.value) },
    date: dateInput.value,
    status: statusSelect.value,
    remarks: remarksInput.value.trim() || null
  };

  try {
    const result = await postData('/attendance/mark', attendanceData);

    resultMessage.textContent = 'Attendance marked successfully!';
    resultMessage.style.color = 'green';

    // Reset form except date (keep today)
    studentSelect.value = '';
    statusSelect.value = '';
    remarksInput.value = '';
  } catch (error) {
    console.error('Error marking attendance:', error);
    resultMessage.textContent = `Error: ${error.message}`;
    resultMessage.style.color = 'red';
  }
});

// Initial setup
setTodayDate();
loadStudents();
