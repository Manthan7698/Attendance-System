import { postData, fetchStudents } from './api.js';

const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// Function to render students list
async function loadStudents() {
  studentList.innerHTML = ''; // Clear list
  try {
    const students = await fetchStudents();
    students.forEach(student => {
      const li = document.createElement('li');
      li.textContent = `${student.name} (${student.rollNumber}) - ${student.course}`;
      studentList.appendChild(li);
    });
  } catch (err) {
    studentList.textContent = 'Failed to load students: ' + err.message;
  }
}

// Handle form submission
studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Extra client-side validation
  const name = studentForm.name.value.trim();
  const email = studentForm.email.value.trim();
  const rollNumber = studentForm.rollNumber.value.trim();
  const course = studentForm.course.value.trim();
  const registrationDate = studentForm.registrationDate.value;

  if (!name || !email || !rollNumber || !course || !registrationDate) {
    alert('Please fill in all fields.');
    return;
  }

  const studentData = {
    name,
    email,
    rollNumber,
    course,
    registrationDate
  };

  try {
    await postData('/students', studentData);
    alert('Student registered successfully!');
    studentForm.reset();
    loadStudents(); // Refresh list
  } catch (err) {
    alert('Failed to register student: ' + err.message);
  }
});

// Initial load
loadStudents();
