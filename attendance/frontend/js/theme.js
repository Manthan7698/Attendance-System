const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'attendysys-theme';

function setTheme(mode) {
  if (mode === 'dark') {
    root.classList.add('dark');
    if (toggleBtn) toggleBtn.textContent = '☀️';
  } else {
    root.classList.remove('dark');
    if (toggleBtn) toggleBtn.textContent = '🌙';
  }
}

function getPreferredTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

function toggleTheme() {
  const current = root.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

// Initialize theme on page load
setTheme(getPreferredTheme());

if (toggleBtn) {
  toggleBtn.addEventListener('click', toggleTheme);
}