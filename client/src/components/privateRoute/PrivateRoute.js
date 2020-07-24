import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    const { loading, isAuth, getUserData } = useContext(authContext);
    useEffect(() => {
        getUserData();
        // eslint-disable-next-line
    }, []);
    return (
        <Route
            {...props}
            render={(props) =>
                !isAuth && !loading ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

export default PrivateRoute;
