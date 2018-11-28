import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Profile from '../Components/Profile'
import Locations from '../Components/Locations'

export default class PasswordRouter extends React.Component {
    render() {
        return (
                <div>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={Profile}/>
                    <Route path="/user/locations" component={Locations}/>
                </div>
        )
    }
}