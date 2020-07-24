import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
    const projectsContext = useContext(projectContext);
    const { form, formerror, showForm, addProject, showError } = projectsContext;

    const [project, setProject] = useState({
        name: '',
        id: '',
    });
    const { name } = project;
    const updateState = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '') {
            showError();
            return;
        }

        addProject(project);
        setProject({ name: '', id: '' });
    };
    return (
        <Fragment>
            <button type="button" className="btn btn-block btn-primary" onClick={() => showForm()}>
                New Project
            </button>
            {form ? (
                <form className="form-new-project" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Project Name"
                        name="name"
                        value={name}
                        onChange={updateState}
                    />

                    <input
                        type="submit"
                        className="btn btn-primary btn-block"
                        value="Add Project"
                    />
                </form>
            ) : null}
            {formerror ? <p className="message error">Project name are required</p> : null}
        </Fragment>
    );
};

export default NewProject;
