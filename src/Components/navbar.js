import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../Services/UserService';

// The NavBar component
// Shows on all pages
export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
        this.userService = UserService.instance;
    }

    // Logs the user out
    logout = () => {
        this.userService.logout();
        window.location.reload();
    }

    // Dynamically sets the links on the navbar
    // If a user is logged in, show profile and logout
    // If a user is not logged in, show login and register
    navbar = () => {
        if (this.state.user) {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item" >
                        <Link to='/profile'>&nbsp;Profile&nbsp;</Link>
                    </li >

                    <li className="nav-item" >
                        <Link to='/' onClick={this.logout}>&nbsp;Logout&nbsp;</Link>
                    </li >
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <Link to='/login'>&nbsp;Login&nbsp;</Link>
                    </li >

                    <li className="nav-item" >
                        <Link to='/register'>&nbsp;Register&nbsp;</Link>
                    </li >

                </ul >
            )
        }
    }

    // Mounts the user
    componentDidMount = () => {
        this.userService.getCurrentUser()
            .then(user => this.setState({ user: user }))
    }

    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar navbar-brand" to='/'> Password Manager</Link>

                <ul className="navbar-nav mr-auto">
                    {/** This aligns the navbar**/}
                </ul>

                {this.navbar()}

            </nav >

        )
    }
}