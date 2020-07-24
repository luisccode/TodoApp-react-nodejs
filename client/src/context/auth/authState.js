import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import axiosClient from '../../config/axios';
import authToken from '../../config/token';
import {
    SUCCESSFUL_SIGNUP,
    SIGNUP_FAILED,
    GET_USER,
    SUCCESSFUL_LOGIN,
    LOGIN_FAILED,
    LOG_OUT,
} from '../../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuth: null,
        user: null,
        alertMessage: null,
        loading: true,
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signUpUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/users', data);
            dispatch({
                type: SUCCESSFUL_SIGNUP,
                payload: response.data,
            });
            getUserData();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error',
            };
            dispatch({
                type: SIGNUP_FAILED,
                payload: alert,
            });
        }
    };
    const logInUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data,
            });
            getUserData();
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error',
            };
            console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_FAILED,
                payload: alert,
            });
        }
    };
    const getUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            authToken(token);
        }
        try {
            const response = await axiosClient.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user,
            });
        } catch (error) {
            dispatch({
                type: LOGIN_FAILED,
            });
        }
    };
    const logOut = () => {
        dispatch({
            type: LOG_OUT,
        });
    };
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuth: state.isAuth,
                user: state.user,
                alertMessage: state.alertMessage,
                loading: state.loading,
                signUpUser,
                logInUser,
                getUserData,
                logOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
export default AuthState;
