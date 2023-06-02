// TaskManager class for managing tasks
class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentId = 0;
  }

  addTask(name, description, assignedTo, dueDate, status) {
    this.tasks.push({
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    });
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(taskIndex, 1);
  }

  render() {
    const taskListContainer = document.getElementById('task-list');
    taskListContainer.innerHTML = '';

    this.tasks.forEach(task => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${task.assignedTo}</td>
        <td>${task.dueDate}</td>
        <td>${task.status}</td>
        <td>
          <button class="edit-button" data-task-id="${task.id}">Edit</button>
          <button class="delete-button" data-task-id="${task.id}">Delete</button>
        </td>
      `;

      taskListContainer.appendChild(row);
    });
  }
}

const taskManager = new TaskManager();

// Function to handle form submission
function addTask(event) {
  event.preventDefault();

  // Get the form input values
  const nameInput = document.getElementById('task-name');
  const descriptionInput = document.getElementById('task-description');
  const assignedToInput = document.getElementById('assigned-to');
  const dueDateInput = document.getElementById('due-date');
  const statusInput = document.getElementById('status');

  // Validate the name input
  const name = nameInput.value.trim();
  const desp = descriptionInput.value.trim();
  const assignedName = assignedToInput.value.trim();
  if (name === '' || name.length < 8) {
    alert('Task Name must not be empty and should be at least 8 characters long.');
    return;
  } 
  else if (desp === '' || desp.length < 15 ){
  alert('Add some relevant description atleast upto 15 characters.');
  } 
  else if (assignedName === '' || assignedName.length < 8) {
    alert('Task Name must not be empty and should be at least 8 characters long.');
    return;
  }

  // Add the task to the task manager
  taskManager.addTask(
    name,
    descriptionInput.value.trim(),
    assignedToInput.value.trim(),
    dueDateInput.value,
    statusInput.value
  );

  // Clear the form inputs
  nameInput.value = '';
  descriptionInput.value = '';
  assignedToInput.value = '';
  dueDateInput.value = '';
  statusInput.value = 'todo';

  // Render the tasks
  taskManager.render();
}

// Function to handle task deletion
function deleteTask(event) {
  const taskId = Number(event.target.dataset.taskId);
  taskManager.deleteTask(taskId);
  taskManager.render();
}

// Add event listeners
const taskForm = document.getElementById('task-form');
const taskTable = document.getElementById('task-table');

taskForm.addEventListener('submit', addTask);
taskTable.addEventListener('click', event => {
  if (event.target.classList.contains('delete-button')) {
    deleteTask(event);
  }
});

// Render initial tasks
taskManager.render();
taskManager.render();
