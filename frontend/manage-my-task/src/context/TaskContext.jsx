import React, { createContext, useState, useEffect } from 'react';

// Create a context for tasks
export const TasksContext = createContext();

// TasksProvider component to provide tasks context to its children
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
  const value = {
    tasks,
    setTasks,
  };

  // Render children with tasks context provided
  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};
