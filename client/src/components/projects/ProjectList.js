import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const ProjectList = () => {
    const projectsContext = useContext(projectContext);
    const { projects, errormessage, getProjects } = projectsContext;

    const { alert, showAlert } = useContext(AlertContext);

    useEffect(() => {
        if (errormessage) {
            showAlert(errormessage.msg, errormessage.category);
        }
        getProjects();
        // eslint-disable-next-line
    }, [errormessage]);

    if (projects.length === 0) return <p>There aren't Projects, create one</p>;
    return (
        <ul className="project-list">
            {alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div> : null}
            <TransitionGroup>
                {projects.map((project) => (
                    <CSSTransition key={project._id} timeout={200} classNames="project">
                        {<Project project={project} />}
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ProjectList;
