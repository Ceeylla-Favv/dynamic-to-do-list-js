document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // If task input is empty, alert user
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add event listener to remove button
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Append button and list item to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field after adding a task
        taskInput.value = '';
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Optionally invoke logic on DOM load if needed
    // (can be used for loading saved tasks from storage)
});