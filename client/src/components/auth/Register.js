import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const { alert, showAlert } = useContext(AlertContext);

    const { alertMessage, isAuth, signUpUser } = useContext(AuthContext);

    const [loginData, setLoginData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });
    const { name, email, password, confirm } = loginData;

    useEffect(() => {
        if (isAuth) {
            props.history.push('/projects');
        }
        if (alertMessage) {
            showAlert(alertMessage.msg, alertMessage.category);
        }
        // eslint-disable-next-line
    }, [alertMessage, isAuth, props.history]);
    const updateData = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirm.trim() === ''
        ) {
            showAlert('All fields are required', 'alert-error');
            return;
        }

        if (password.length < 6) {
            showAlert('The Password must be at least 6 characters', 'alert-error');
            return;
        }
        if (password !== confirm) {
            showAlert('The Password must be match', 'alert-error');
            return;
        }

        signUpUser({ name, email, password });
    };
    return (
        <div className="form-login">
            {alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div> : null}
            <div className="form-container dark-shadow">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={updateData}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={updateData}
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
                            onChange={updateData}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={updateData}
                        />
                    </div>

                    <div className="form-field">
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Sign In"
                        />
                    </div>
                </form>

                <Link to={'/'} className="login-link">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
