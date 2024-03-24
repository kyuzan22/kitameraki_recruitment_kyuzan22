import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack, Checkbox } from '@fluentui/react';
import DateTimePicker from './DateTimePicker';
import "../styles/transition.css";
import useTasks from '../hooks/useTask';

const stackTokens = { childrenGap: 10 };

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      setErrorMessage('Please input something');
      return;
    };
    const newTitle = taskTitle.trim();
    const newDesc = taskDescription.trim();
    addTask(newTitle, newDesc, hasDeadline ? deadline : null);
    setErrorMessage('');
    setTaskTitle('');
    setTaskDescription('');
    setHasDeadline(false);
    setDeadline(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack tokens={stackTokens}>
        <TextField
          label="Task Name"
          placeholder="Put your task here"
          value={taskTitle}
          onChange={(e) => { setTaskTitle(e.target.value); setErrorMessage(''); }}
          errorMessage={errorMessage}
          required
        />
        <TextField
          label="Task Detail"
          placeholder="Please enter task detail here"
          multiline
          autoAdjustHeight
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <Checkbox
          label="Set Deadline"
          checked={hasDeadline}
          onChange={(e) => setHasDeadline(e.target.checked)}
        />
        {/* {hasDeadline && ( */}
        <div style={{
          transition: 'opacity 0.5s ease-in-out', // Example transition property
          opacity: hasDeadline ? 1 : 0, // Adjust the opacity based on the hasDeadline state
          visibility: hasDeadline ? 'visible' : 'hidden' // Toggle visibility based on the hasDeadline state
        }}>
          <DateTimePicker
            editData={false}
            currentDeadLine={deadline}
            onSelectDateTime={(time) => { setDeadline(time) }}
          />
        </div>
        {/* )} */}
        <PrimaryButton type="submit" style={{transition: '0.5s ease-in-out', marginTop: hasDeadline ? 0 : '-65px',  width: 'fit-content' }}>Add Task</PrimaryButton>
      </Stack>
    </form>
  );
};

export default TaskForm;
