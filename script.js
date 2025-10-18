const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let history = JSON.parse(localStorage.getItem('history')) || [];

function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveHistory() {
localStorage.setItem('history', JSON.stringify(history));
}

function renderTasks() {
taskList.innerHTML = '';
if (tasks.length === 0) {
    taskList.innerHTML = '<p style="color:#888;text-align:center;">No tasks yet. Add one above!</p>';
    return;
}

tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    li.innerHTML = `
    <div>
        <strong>${t.text}</strong>
        <div class="time">${t.date} ${t.time}</div>
    </div>
    <div>
        <button onclick="toggleDone(${i})">✔</button>
        <button onclick="deleteTask(${i})">🗑</button>
    </div>
    `;
    taskList.appendChild(li);
});
}

function addTask() {
const text = taskInput.value.trim();
const date = taskDate.value;
const time = taskTime.value;

if (!text || !date || !time) {
    alert('Please fill all fields.');
    return;
}

const newTask = { text, date, time, done: false };
tasks.push(newTask);
saveTasks();
renderTasks();
taskInput.value = '';
taskDate.value = '';
taskTime.value = '';
}

function toggleDone(index) {
tasks[index].done = !tasks[index].done;
if (tasks[index].done) {
    history.push({ ...tasks[index], completedAt: new Date().toLocaleString() });
    tasks.splice(index, 1);
}
saveTasks();
saveHistory();
renderTasks();
}

function deleteTask(index) {
tasks.splice(index, 1);
saveTasks();
renderTasks();
}

addBtn.addEventListener('click', addTask);
renderTasks();
