import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Proyecto = ({ project }) => {
    const projectsContext = useContext(projectContext);
    const { selectCurrentProject } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { getCurrentTasks } = tasksContext;

    const handleClick = (projectId) => {
        selectCurrentProject(projectId);
        getCurrentTasks(projectId);
    };

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => handleClick(project._id)}
            >
                {project.name}
            </button>
        </li>
    );
};

export default Proyecto;
