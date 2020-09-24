import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Task from './Task';
const TaskList = () => {
    const projectsContext = useContext(projectContext);
    const { currentproject, deleteProject } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { currenttasks } = tasksContext;
    if (!currentproject) return <h2>Select a Project</h2>;
    return (
        <Fragment>
            <h2>Project: {currentproject.name} </h2>

            <ul className="task-list">
                {currenttasks.length === 0 ? (
                    <li className="task">
                        <p>There aren't Task</p>
                    </li>
                ) : (
                    <TransitionGroup>
                        {currenttasks.map((task) => (
                            <CSSTransition key={task._id} timeout={200} classNames="task">
                                <Task task={task} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                )}
            </ul>

            <button
                type="button"
                className="btn btn-delete"
                onClick={() => deleteProject(currentproject._id)}
            >
                Delete Project &times;
            </button>
        </Fragment>
    );
};

export default TaskList;
