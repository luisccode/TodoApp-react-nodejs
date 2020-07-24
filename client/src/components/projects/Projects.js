import React, { useContext, useEffect } from 'react';
import Sidebar from '../layaout/Sidebar';
import Bar from '../layaout/Bar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import authContext from '../../context/auth/authContext';

const Projects = () => {
    const { getUserData } = useContext(authContext);
    useEffect(() => {
        getUserData();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="container">
            <Sidebar />

            <div className="primary-section">
                <Bar />

                <main>
                    <TaskForm />

                    <div className="task-container">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;
