import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack, Checkbox } from '@fluentui/react';
import TimePickerDateTimePicker from './DateTimePicker';


const stackTokens = { childrenGap: 10 };

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()){
        setErrorMessage('Please input something')
        return
    };
    const newTitle = title.trim();
    const newDesc = description.trim();
    addTask({ title: newTitle, description: newDesc, deadline: hasDeadline ? deadline : null });
    setErrorMessage('')
    setTitle('');
    setDescription('');
    setHasDeadline(false);
    setDeadline(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack tokens={stackTokens}>
        <TextField
          label="Task Name"
          placeholder="Put your task here"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrorMessage(''); }}
          errorMessage={errorMessage}
          required
        />
        <TextField
          label="Task Detail"
          placeholder="Please enter task detail here"
          multiline
          autoAdjustHeight
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Checkbox
          label="Set Deadline"
          checked={hasDeadline}
          onChange={(e) => setHasDeadline(e.target.checked)}
        />
        {hasDeadline && (
          <TimePickerDateTimePicker
            editData={false}
            currentdeadLine={deadline}
            onSelectDateTime={(time) => {setDeadline(time)}}
          />
        )}
        <PrimaryButton type="submit" style={{ width: 'fit-content' }}>Add Task</PrimaryButton>
      </Stack>
    </form>
  );
};

export default TaskForm;
