import React from 'react';
import NavBar from './NavBar';
import PasswordRouter from '../Router/PasswordRouter';

export default class PasswordManager extends React.Component {
    render() {
        return (
        <div>
            <NavBar/>
            <PasswordRouter/>
        </div>);
    }
}
