import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    FORM_VALIDATION,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORM_PROJECT:
            return {
                ...state,
                form: true,
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case ADD_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects],
                form: false,
                formerror: false,
            };
        case FORM_VALIDATION:
            return {
                ...state,
                formerror: true,
            };
        case CURRENT_PROJECT:
            return {
                ...state,
                currentproject: state.projects.filter(
                    (project) => project._id === action.payload
                )[0],
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter((project) => project._id !== action.payload),
                currentproject: null,
            };
        case PROJECT_ERROR:
            return {
                ...state,
                errormessage: action.payload,
            };
        default:
            return state;
    }
};
