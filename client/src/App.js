import React from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Projects from './components/projects/Projects';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import authToken from './config/token';
import PrivateRoute from './components/privateRoute/PrivateRoute';
const token = localStorage.getItem('token');
if (token) {
    authToken(token);
}
function App() {
    return (
        <ProjectState>
            <TaskState>
                <AlertState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route path="/register" component={Register} />
                                <PrivateRoute path="/projects" component={Projects} />
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertState>
            </TaskState>
        </ProjectState>
    );
}

export default App;
