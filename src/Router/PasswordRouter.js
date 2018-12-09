import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Profile from '../Components/Profile'
import Locations from '../Components/Locations'
import Home from '../Components/Home'

// All Routes (allows the use of links to load pages)
export default class PasswordRouter extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/user/locations" exact component={Locations} />
                    <Route component={Home} />
                </Switch>
            </div >

        )
    }
}