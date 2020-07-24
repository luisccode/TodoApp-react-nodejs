import { CURRENT_TASKS, ADD_TASK, DELETE_TASK, SELECT_TASK_TO_EDIT, EDIT_TASK } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case CURRENT_TASKS:
            return {
                ...state,
                currenttasks: action.payload,
            };
        case ADD_TASK:
            return {
                ...state,
                currenttasks: [action.payload, ...state.currenttasks],
            };
        case DELETE_TASK:
            return {
                ...state,
                currenttasks: state.currenttasks.filter((task) => task._id !== action.payload),
            };
        case SELECT_TASK_TO_EDIT:
            return {
                ...state,
                tasktoedit: action.payload,
            };
        case EDIT_TASK:
            return {
                ...state,
                currenttasks: state.currenttasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                ),
                tasktoedit: null,
            };
        default:
            return state;
    }
};
