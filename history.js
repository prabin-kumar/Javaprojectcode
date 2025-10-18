const historyList = document.getElementById('historyList');
let history = JSON.parse(localStorage.getItem('history')) || [];

function renderHistory() {
    historyList.innerHTML = '';
    if (history.length === 0) {
    historyList.innerHTML = '<p style="color:#888;text-align:center;">No completed tasks yet.</p>';
    return;
    }

history.forEach(h => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div>
        <strong>${h.text}</strong>
        <div class="time">Scheduled: ${h.date} ${h.time}</div>
        <div class="time">Completed: ${h.completedAt}</div>
    </div>
    `;
    historyList.appendChild(li);
    });
}

renderHistory();
