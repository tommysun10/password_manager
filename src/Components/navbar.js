import React from 'react';
import {Link, Route} from 'react-router-dom';
import Register from './register'
import Login from './login'

export default class Navbar extends React.Component {
    render() {
        return (
                <div>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'> | Register</Link>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </div>
        )
    }
}