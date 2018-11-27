import React from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
    render() {
        return (
                <div>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'> | Register</Link>
                </div>
        )
    }
}