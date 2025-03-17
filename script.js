document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${task}</span><button class="complete-btn" data-index="${index}">Complete</button>`; 
            taskList.appendChild(li);
        });
    }

    renderTasks();

    addTaskButton.addEventListener('click', function () {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('complete-btn')) {
            const index = parseInt(event.target.dataset.index);
            const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
            completedTasks.push(tasks[index]);
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });
});