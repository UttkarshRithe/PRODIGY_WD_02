let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

document.getElementById('startBtn').addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 100);
    updateButtonState('start');
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    elapsedTime = Date.now() - startTime;
    clearInterval(timerInterval);
    updateButtonState('pause');
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
  updateButtonState('reset');
});

document.getElementById('lapBtn').addEventListener('click', () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<span>${lapsList.children.length + 1}</span> ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapsList.scrollTop = lapsList.scrollHeight;
  }
});

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateButtonState(state) {
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  if (state === 'start') {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  } else if (state === 'pause') {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  } else {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}
