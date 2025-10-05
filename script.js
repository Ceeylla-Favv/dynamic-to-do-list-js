document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks array from localStorage (or start with empty array)
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // Save the current tasks array to localStorage
  function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Create a DOM element for a task and attach removal behavior
  function createTaskElement(taskText) {
    const li = document.createElement('li');

    // Use a span so the text and button are separate
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // Create Remove button and add required class via classList.add
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Assign onclick event to remove the li and update localStorage
    removeBtn.onclick = () => {
      // Find index of this li in the taskList to remove corresponding item from tasks array
      const index = Array.from(taskList.children).indexOf(li);
      if (index > -1) {
        tasks.splice(index, 1); // remove from tasks array
        updateLocalStorage();   // persist change
      }
      taskList.removeChild(li); // remove from DOM
    };

    // Append button and list item to DOM
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  /**
   * addTask: adds a new task to the DOM and optionally saves it to localStorage.
   * If taskTextParam is provided (string), that text is used (used when loading saved tasks).
   * If not provided, the function reads the value from the input field.
   *
   * @param {string} [taskTextParam] - optional task text to add
   * @param {boolean} [save=true] - whether to save this addition to localStorage
   */
  function addTask(taskTextParam, save = true) {
    const taskText = (typeof taskTextParam === 'string')
      ? taskTextParam
      : taskInput.value.trim();

    // If empty, alert the user
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create DOM for task
    createTaskElement(taskText);

    // If requested, update tasks array and persist
    if (save) {
      tasks.push(taskText);
      updateLocalStorage();
    }

    // Clear the input field for the next task
    taskInput.value = '';
  }

  // Load saved tasks on startup
  function loadTasks() {
    // tasks array was populated from localStorage earlier
    tasks.forEach(task => addTask(task, false)); // false => don't save again
  }

  // Attach event listeners
  addButton.addEventListener('click', () => addTask()); // wrapper to avoid event object being passed
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Initialize the UI with stored tasks
  loadTasks();
});
