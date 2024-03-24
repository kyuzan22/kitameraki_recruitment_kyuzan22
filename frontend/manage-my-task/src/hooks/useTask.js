import { useContext } from 'react';
import axios from 'axios';
import { TasksContext } from '../context/TaskContext';
import { baseUrl } from '../utils/api';

// Custom hook to manage tasks data
const useTasks = (setDataChange) => {
    const { tasks, setTasks } = useContext(TasksContext);

    // Function to fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${baseUrl}tasks`); 
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Function to add a new task
    const addTask = async (title, description, deadline) => {
        try {
            const response = await axios.post(`${baseUrl}tasks`, { 
                title,
                description,
                deadline,
            });
            setDataChange(true);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Function to edit an existing task
    const editTask = async (taskId, title, description, deadline) => {
        try {
            const response = await axios.put(`${baseUrl}tasks/${taskId}`, { 
                title,
                description,
                deadline,
            });
            setDataChange(true);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Function to delete a task
    const deleteTask = async taskId => {
        try {
            await axios.delete(`${baseUrl}tasks/${taskId}`);
            setDataChange(true);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Return tasks data and CRUD functions
    return { tasks, fetchTasks, addTask, editTask, deleteTask };
};

export default useTasks;
