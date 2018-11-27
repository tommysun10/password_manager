import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../Components/Login';
import Register from '../Components/Register';

export default class PasswordRouter extends React.Component {
    render() {
        return (
                <div>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </div>
        )
    }
}