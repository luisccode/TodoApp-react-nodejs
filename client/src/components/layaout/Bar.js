import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';

const Bar = () => {
    const { user, logOut } = useContext(authContext);

    return (
        <header className="app-header">
            {user ? (
                <p className="user-name">
                    Hello <span>{user.name}</span>
                </p>
            ) : null}

            <nav className="nav-primary">
                <button className="btn btn-blank log-out" onClick={logOut}>
                    Log out
                </button>
            </nav>
        </header>
    );
};

export default Bar;
