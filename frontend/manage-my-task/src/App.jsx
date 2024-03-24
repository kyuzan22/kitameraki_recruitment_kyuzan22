import React from 'react';
import './App.css';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import Sidebar from './components/Navbar';
import MainPage from './Pages/LandingPage';
import { TasksProvider } from './context/TaskContext';

function App() {
  initializeIcons(undefined, { disableWarnings: true });

  return (
    <TasksProvider>
      <Sidebar>
        <MainPage />
      </Sidebar>
    </TasksProvider>
  );
}

export default App;
