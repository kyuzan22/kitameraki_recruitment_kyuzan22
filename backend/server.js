const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Dummy task data stored in memory
const tasks = [];
let taskIdCounter = 1;

// Routes
app.get('/tasks', (req, res) => {
  // Return all tasks
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  // Add a new task
  const { title, description, deadline } = req.body;
  if (!title.trim()) {
    return res.status(400).json({ error: 'Title cannot be empty' }); // Updated error message
  }

  const newTask = {
    id: taskIdCounter++,
    title,
    description: description || '',
    deadline: deadline || '',
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    // Update an existing task
    const taskId = parseInt(req.params.id);
    const { title, description, deadline } = req.body;
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Update title
    taskToUpdate.title = title || taskToUpdate.title;
  
    // Update description
    if (description !== undefined) {
      taskToUpdate.description = description;
    }
  
    // Update deadline
    if (deadline !== undefined) {
      taskToUpdate.deadline = deadline;
    }
  
    res.json(taskToUpdate);
  });
  

app.delete('/tasks/:id', (req, res) => {
  // Delete a task
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
