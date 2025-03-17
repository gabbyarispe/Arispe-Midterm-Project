document.addEventListener('DOMContentLoaded', function () {
    const completedList = document.getElementById('completed-list');
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    function renderCompletedTasks() {
        completedList.innerHTML = '';
        completedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="completed-task">${task}</span><button class="delete-completed-btn" data-index="${index}">Delete</button>`;
            completedList.appendChild(li);
        });
    }

    renderCompletedTasks();

    completedList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-completed-btn')) {
            const index = parseInt(event.target.dataset.index);
            completedTasks.splice(index, 1);
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            renderCompletedTasks();
        }
    });
});