import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import axiosClient from '../../config/axios';
import { CURRENT_TASKS, ADD_TASK, DELETE_TASK, SELECT_TASK_TO_EDIT, EDIT_TASK } from '../../types/';

const TaskState = (props) => {
    const initialState = {
        currenttasks: [],
        tasktoedit: null,
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getCurrentTasks = async (projectId) => {
        try {
            const response = await axiosClient.get('/api/tasks', { params: { projectId } });
            dispatch({
                type: CURRENT_TASKS,
                payload: response.data.tasks,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await axiosClient.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: response.data.task,
            });
        } catch (error) {}
    };

    const deleteTask = async (taskId, projectId) => {
        try {
            await axiosClient.delete(`/api/tasks/${taskId}`, { params: { projectId } });
            dispatch({
                type: DELETE_TASK,
                payload: taskId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const selectTaskToEdit = (task) => {
        dispatch({
            type: SELECT_TASK_TO_EDIT,
            payload: task,
        });
    };

    const editTask = async (task) => {
        const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
        dispatch({
            type: EDIT_TASK,
            payload: response.data.task,
        });
    };
    return (
        <TaskContext.Provider
            value={{
                currenttasks: state.currenttasks,
                tasktoedit: state.tasktoedit,
                getCurrentTasks,
                addTask,
                deleteTask,
                selectTaskToEdit,
                editTask,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskState;
