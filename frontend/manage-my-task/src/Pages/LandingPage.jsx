import React, { useState } from 'react';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import InfiniteScroll from '../components/InfiniteScroll.jsx';
import { initializeIcons } from '@fluentui/react/lib/Icons';

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const loadMore = () => {
    console.log('Loading more tasks...');
  };

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, newTitle, newDescription,newDeadline) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title: newTitle !== undefined ? newTitle : task.title,
          description: newDescription !== undefined ? newDescription : task.description,
          deadline: newDeadline,
        };
      }
      return task;
    }));
    console.log("this is task ")
    console.log(tasks)
  };

  return (
    <div className="container">
      <h1>Task Management App</h1>
      <div className="task-form">
        <TaskForm addTask={addTask} />
      </div>
      <h3 style={{marginBottom:'10px'}}>Your Tasks</h3>
      <div className="task-list">
        <InfiniteScroll loadMore={loadMore}>
          <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MainPage;
