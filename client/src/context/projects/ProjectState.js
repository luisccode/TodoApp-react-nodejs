import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_VALIDATION,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR,
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = (props) => {
    const initialState = {
        projects: [],
        form: false,
        formerror: false,
        currentproject: null,
        errormessage: null,
    };
    const [state, dispatch] = useReducer(projectReducer, initialState);

    const showForm = () => {
        dispatch({
            type: FORM_PROJECT,
        });
    };

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects,
            });
        } catch (error) {
            const alert = {
                msg: 'Something is wrong...',
                category: 'alert-error',
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
    };
    const addProject = async (project) => {
        try {
            const response = await axiosClient.post('/api/projects', project);
            dispatch({
                type: ADD_PROJECT,
                payload: response.data,
            });
        } catch (error) {
            const alert = {
                msg: 'Something is wrong...',
                category: 'alert-error',
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
    };

    const selectCurrentProject = (projectId) => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId,
        });
    };

    const showError = () => {
        dispatch({
            type: FORM_VALIDATION,
        });
    };

    const deleteProject = async (projectId) => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId,
            });
        } catch (error) {
            const alert = {
                msg: 'Something is wrong...',
                category: 'alert-error',
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert,
            });
        }
    };
    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                formerror: state.formerror,
                currentproject: state.currentproject,
                errormessage: state.errormessage,
                showForm,
                getProjects,
                addProject,
                showError,
                selectCurrentProject,
                deleteProject,
            }}
        >
            {props.children}
        </projectContext.Provider>
    );
};

export default ProjectState;
