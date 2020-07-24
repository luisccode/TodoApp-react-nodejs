import React from 'react';
import NewProject from '../projects/NewProject';
import ProjectList from '../projects/ProjectList';

const Sidebar = () => {
    return (
        <aside>
            <h1>
                MERN<span>Tasks</span>
            </h1>

            <NewProject />

            <div className="projects">
                <h2>Your Projects</h2>
                <ProjectList />
            </div>
        </aside>
    );
};

export default Sidebar;
