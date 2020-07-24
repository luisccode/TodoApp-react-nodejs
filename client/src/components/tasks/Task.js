import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {
    const tasksContext = useContext(taskContext);
    const { deleteTask, getCurrentTasks, editTask, selectTaskToEdit } = tasksContext;

    const handleDelete = (taskId, projectId) => {
        deleteTask(taskId, projectId);
        getCurrentTasks(projectId);
    };
    const toggleState = () => {
        task.state = !task.state;
        editTask(task);
    };
    const handleEdit = (task) => {
        selectTaskToEdit(task);
    };
    return (
        <li className="task shadow">
            <p>{task.name} </p>

            <div className="state">
                {task.state ? (
                    <button type="button" className="complete" onClick={toggleState}>
                        Complete
                    </button>
                ) : (
                    <button type="button" className="incomplete" onClick={toggleState}>
                        Incomplete
                    </button>
                )}
            </div>

            <div className="acciones">
                <button type="button" className="btn btn-primary" onClick={() => handleEdit(task)}>
                    Editar
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDelete(task._id, task.projectId)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
};

export default Task;
