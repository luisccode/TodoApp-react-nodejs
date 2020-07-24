import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
    const { alert, showAlert } = useContext(AlertContext);

    const { alertMessage, isAuth, logInUser } = useContext(AuthContext);

    useEffect(() => {
        if (isAuth) {
            props.history.push('/projects');
        }
        if (alertMessage) {
            showAlert(alertMessage.msg, alertMessage.category);
        }
        // eslint-disable-next-line
    }, [alertMessage, isAuth, props.history]);

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = loginData;

    const updateState = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alert-error');
        }
        logInUser({ email, password });
    };
    return (
        <div className="form-login">
            {alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div> : null}
            <div className="form-container dark-shadow">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={updateState}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={updateState}
                        />
                    </div>

                    <div className="form-field">
                        <input type="submit" className="btn btn-primary btn-block" value="Login" />
                    </div>
                </form>

                <Link to={'/register'} className="register-link">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Login;
