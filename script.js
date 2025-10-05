document.addEventListener('DOMContentLoaded', () => {
    // Select key DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get user input and remove extra spaces

        // ✅ Check if the input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return; // Stop execution here if no task entered
        }

        // Create a new <li> element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task when remove button is clicked
        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        // Add the remove button to the list item
        listItem.appendChild(removeButton);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field for the next task
        taskInput.value = '';
    }

    // ✅ Event listener for "Add Task" button
    addButton.addEventListener('click', addTask);

    // ✅ Event listener to allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
