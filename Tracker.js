document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            
            if (task.isEditing) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = task.text;
                input.classList.add('edit');
                li.appendChild(input);

                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                saveButton.classList.add('edit');
                saveButton.addEventListener('click', () => {
                    task.text = input.value;
                    task.isEditing = false;
                    renderTasks();
                });
                li.appendChild(saveButton);
            } else {
                li.textContent = task.text;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit');
                editButton.addEventListener('click', () => {
                    task.isEditing = true;
                    renderTasks();
                });
                li.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete');
                deleteButton.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    renderTasks();
                });
                li.appendChild(deleteButton);
            }

            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, isEditing: false });
            taskInput.value = '';
            renderTasks();
        }
    });

    renderTasks();
})