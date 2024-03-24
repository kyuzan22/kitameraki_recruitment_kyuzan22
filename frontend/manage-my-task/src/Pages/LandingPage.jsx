import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import InfiniteScroll from '../components/InfiniteScroll.jsx';
import useTasks from '../hooks/useTask.js';
import { IconButton, Icon, Stack } from '@fluentui/react';

const MainPage = () => {
  const [dataChange, setDataChange] = useState(true);
  const [isHorizontal, setIsHorizontal] = useState(true);

  const { tasks, fetchTasks, addTask, editTask, deleteTask, loading } = useTasks(setDataChange);

  useEffect(() => {
    if (dataChange) {
      fetchTasks()
      setDataChange(false)
    }
  }, [dataChange]);
  
  const toggleOrientation = () => {
    setIsHorizontal(!isHorizontal);
  };

  const loadMore = () => {
    console.log('Loading more tasks...');
  };

  return (
    <div className="container">
      <h1>Task Management App</h1>
      <TaskForm addTask={addTask} />
      <Stack horizontal horizontalAlign="space-between" style={{ alignItems: 'center' }}>
        <h3>Your Tasks</h3>
        <IconButton iconProps={{ iconName: isHorizontal ? 'QuickNote' : 'BulletedList' }} onClick={toggleOrientation} />
      </Stack>
      <div className="task-list">
        <InfiniteScroll loadMore={loadMore}>
          <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} isHorizontal={isHorizontal} />
          {loading && <p>Loading tasks...</p>}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MainPage;
