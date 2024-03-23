import React, { useState, useEffect } from 'react';
import { Stack } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import TaskNote from './TaskNotes';
import DetailTaskDialog from './DetailTaskDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import TimePickerDateTimePicker from './DateTimePicker';

const stackTokens = { childrenGap: 40 };

const TaskList = ({ tasks, deleteTask, editTask }) => {
    const [dialogContent, setDialogContent] = useState(null);
    const [hideDialog, setHideDialog] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [hasDeadline, setHasDeadline] = useState(false);
    const [originalDeadline, setOriginalDeadline] = useState(null);

    useEffect(() => {
        if (currentTask) {
            setHasDeadline(!!currentTask.deadline);
            setOriginalDeadline(currentTask.deadline);
            console.log("this is current")
            console.log(currentTask)
        }
    }, [hideDialog]);

    useEffect(() => {
        if (currentTask) {
            setDialogContent(renderDialogContent(currentTask));
            console.log("this is current deadline")
            console.log(currentTask.deadline)
            if (!editMode) {
                editTask(currentTask.id, currentTask.title, currentTask.description, originalDeadline);
            }
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

    const confirmEditTasks = () => {
        setEditMode(!editMode)
    };

    const confirmAllDeleteTasks = () => {
        selectedTasks.forEach(taskId => deleteTask(taskId));
        closeDeleteConfirmation();
        setSelectedTasks([]);
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

    const renderDialogContent = (task) => {
        if (!task) return null;

        return (
            <div>
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
                        editData={!hideDialog}
                        currentDeadLine={currentTask.deadline ? currentTask.deadline : new Date()}
                        onSelectDateTime={(time) => { handleDeadlineChange(time) }}
                    />
                )}
            </div>
        );
    };

    return (
        <div>
            <Stack horizontal wrap tokens={stackTokens}>
                {tasks.map((task) => (
                    <div key={task.id}>
                        <TaskNote toDo={() => showDialog(task)}>
                            {task.title}
                        </TaskNote>
                    </div>
                ))}
            </Stack>

            <DetailTaskDialog
                hidden={hideDialog}
                onDismiss={closeDialog}
                dialogContent={dialogContent}
                editMode={editMode}
                setEditMode={confirmEditTasks}
                openDeleteConfirmation={openDeleteConfirmation}
                closeDialog={closeDialog}
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
