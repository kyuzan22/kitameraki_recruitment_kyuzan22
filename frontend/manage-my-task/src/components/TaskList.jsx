import React, { useState, useEffect } from 'react';
import { Stack } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import TaskNote from './TaskNotes';
import DetailTaskDialog from './DetailTaskDialog'; 
import DeleteConfirmationDialog from './DeleteConfirmationDialog'; 
import TimePickerDateTimePicker from './DateTimePicker'; 

const TaskList = ({ tasks, deleteTask, editTask, isHorizontal }) => {
    const [dialogContent, setDialogContent] = useState(null); 
    const [hideDialog, setHideDialog] = useState(true); 
    const [editMode, setEditMode] = useState(false); 
    const [currentTask, setCurrentTask] = useState(null); 
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
    const [hasDeadline, setHasDeadline] = useState(false); 
    const [originalDeadline, setOriginalDeadline] = useState(null); 

    const stackTokens = { childrenGap: isHorizontal ? 40 : 5 }; 

    useEffect(() => {
        if (currentTask) {
            setHasDeadline(!!currentTask.deadline); 
            currentTask.deadline ? setOriginalDeadline(new Date(currentTask.deadline)) : setOriginalDeadline(null); 
        }
    }, [hideDialog]);

    useEffect(() => {
        if (currentTask) {
            setDialogContent(renderDialogContent(currentTask)); 
        }
    }, [hasDeadline, currentTask, editMode]);

    const handleTitleChange = (e) => { 
        const newTitle = e.target.value;
        setCurrentTask(prevTask => ({ ...prevTask, title: newTitle }));
    };

    const handleDescriptionChange = (e) => { 
        const newDescription = e.target.value;
        setCurrentTask(prevTask => ({ ...prevTask, description: newDescription }));
    };

    const handleDeadlineChange = (time) => { 
        const newDeadline = time;
        setCurrentTask(prevTask => ({ ...prevTask, deadline: newDeadline }));
        setOriginalDeadline(time);
    };

    const handleCheckboxChange = (e) => { 
        const isChecked = e.target.checked;
        setHasDeadline(isChecked);
        if (!isChecked && editMode) {
            setCurrentTask(prevTask => ({ ...prevTask, deadline: null }));
            setOriginalDeadline(null);
        }
    };

    const openDeleteConfirmation = () => { 
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => { 
        setShowDeleteConfirmation(false);
    };

    const confirmDeleteTasks = () => { 
        deleteTask(currentTask.id);
        setHideDialog(true);
        setCurrentTask(null);
        closeDeleteConfirmation();
    };

    const showDialog = (task) => { 
        setCurrentTask(task);
        setHideDialog(false);
    };

    const closeDialog = () => { 
        setHideDialog(true);
        setEditMode(false);
        setCurrentTask(null);
        if (!hasDeadline) {
            setCurrentTask(prevTask => ({ ...prevTask, deadline: originalDeadline }));
        }
    };

    const handleSave = () => { 
        editTask(currentTask.id, currentTask.title, currentTask.description, originalDeadline);
        setEditMode(false);
    }

    const renderDialogContent = (task) => { 
        if (!task) return null;

        return (
            <Stack tokens={{ childrenGap: 10 }}> 
                <TextField
                    label="Task"
                    value={task.title}
                    readOnly={!editMode}
                    onChange={handleTitleChange}
                />
                <TextField
                    label="Detail"
                    multiline
                    autoAdjustHeight
                    readOnly={!editMode}
                    value={task.description}
                    onChange={handleDescriptionChange}
                />
                {editMode && (
                    <Checkbox
                        label={hasDeadline ? "Remove Deadline" : "Add Deadline"}
                        checked={hasDeadline}
                        onChange={handleCheckboxChange}
                    />
                )}

                {hasDeadline && (
                    <TimePickerDateTimePicker
                        readOnly={!editMode}
                        editData={!hideDialog}
                        currentDeadLine={currentTask.deadline ? new Date(currentTask.deadline) : new Date()}
                        onSelectDateTime={(time) => { handleDeadlineChange(time) }}
                    />
                )}
            </Stack>
        );
    };

    return (
        <div>
            <Stack horizontal={isHorizontal} wrap tokens={stackTokens}> 
                {tasks.map((task) => (
                    <Stack.Item key={task.id} grow={isHorizontal}> 
                        <TaskNote toDo={() => showDialog(task)}> 
                            {task.title}
                        </TaskNote>
                    </Stack.Item>
                ))}
            </Stack>

            <DetailTaskDialog
                hidden={hideDialog} 
                onDismiss={closeDialog} 
                dialogContent={dialogContent} 
                editMode={editMode} 
                setEditMode={setEditMode} 
                openDeleteConfirmation={openDeleteConfirmation} 
                closeDialog={closeDialog} 
                onSave={handleSave} 
            />
            <DeleteConfirmationDialog
                hidden={!showDeleteConfirmation} 
                onDismiss={closeDeleteConfirmation} 
                onConfirm={confirmDeleteTasks} 
            />
        </div>
    );
};

export default TaskList;
