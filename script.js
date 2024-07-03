const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(task) {
    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function renderTasks(category) {
  const tasksHTML = taskList.filter((task) => {
    if (category === 'all' || task.category === category) {
      return task;
    }
  }).map((task, index) => {
    return `
      <tr>
        <td> ${task.name} </td>
        <td> ${task.date} </td>
        <td> ${task.time} </td>
        <td> ${getPriorityIcon(task.priority)} </td>
        <td> ${getCategoryIcon(task.category)} </td>
        <td> <input type='checkbox' id='complete-${index}' ${task.completed ? 'checked' : ''}> </td>
      </tr>
    `;
  }).join('');
  document.getElementById('tasks').innerHTML = `
    <table style="margin-left:8rem;font-size:18px;">
      <thead>
        <tr>
          <th>|| Task Name |</th>
          <th>| Task Date |</th>
          <th>| Task Time |</th>
          <th>| Task Priority |</th>
          <th>| Task Category |</th>
          <th>| Completed ||</th>
        </tr>
      </thead>
      <tbody>
        ${tasksHTML}
      </tbody>
    </table>
  `;
}

function getTaskStyle(task) {
    if (new Date(task.date + ' ' + task.time) <= new Date()) {
        return 'font-weight: bold;';
    }
}

function getPriorityIcon(priority) {
    switch (priority) {
        case 'low':
            return '&#10060;';
        case 'medium':
            return '&#10061;';
        case 'high':
            return '&#10062;';
        default:
            return '';
    }
}

function getCategoryIcon(category) {
    switch (category) {
        case 'school':
            return 'school';
        case 'work':
            return 'work';
        case 'personal':
            return 'personal';
        default:
            return '';
    }
}

// Render initial tasks from local storage
if (taskList.length > 0) {
    renderTasks('all');
}

document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskCategory = document.getElementById('school').checked ? 'school' : document.getElementById('work').checked ? 'work' : 'personal';
    addTask({ name: taskName, date: taskDate, time: taskTime, priority: taskPriority, category: taskCategory, completed: false });
    renderTasks('all');
});