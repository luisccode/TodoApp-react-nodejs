import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
const TaskForm = () => {
    const projectsContext = useContext(projectContext);
    const { currentproject } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { addTask, tasktoedit, editTask, getCurrentTasks } = tasksContext;

    const [taskName, setTaskName] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (tasktoedit) {
            setTaskName(tasktoedit.name);
        }
    }, [tasktoedit]);

    const handleChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') {
            setError(true);
            return;
        }
        if (tasktoedit) {
            editTask({ ...tasktoedit, name: taskName });
            getCurrentTasks(currentproject._id);
        } else {
            const task = { name: taskName, projectId: currentproject._id };
            addTask(task);
        }
        setError(false);
        setTaskName('');
    };
    if (!currentproject) return null;
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task Name"
                        name="name"
                        value={taskName}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="submit"
                        className="btn btn-primary btn-submit btn-block"
                        value={tasktoedit ? 'Edit Task' : 'Add Task'}
                    />
                </div>
            </form>
            {error ? <p className="message error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
};

export default TaskForm;
