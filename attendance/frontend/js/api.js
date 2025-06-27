const BASE_URL = 'http://localhost:8080/api';

// Generic POST request helper
async function postData(url, data) {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa('user:password') },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`POST request failed: ${response.statusText}`);
  }
  return response.json();
}

// Generic GET request helper
async function getData(url) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Authorization': 'Basic ' + btoa('user:password') }
  });
  if (!response.ok) {
    throw new Error(`GET request failed: ${response.statusText}`);
  }
  return response.json();
}


export { postData, getData };

// Fetch attendance summary for a student by ID
export async function fetchAttendanceSummary(studentId) {
  return getData(`/attendance/summary/${studentId}`);
}

// Fetch all students
export async function fetchStudents() {
  return getData('/students');
}
