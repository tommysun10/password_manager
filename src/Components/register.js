import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../Services/UserService'
import UserLogic from './Logic/user.logic';

// TODO
// Check username for existing
// Create the user

// Additional -> Confirm email is valid

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            usernameEmpty: false,
            userNameTaken: false,
            passwordBad: false,
            password2Empty: false,
            passwordNoMatch: false,
            firstNameEmpty: false,
            lastNameEmpty: false,
            emailEmpty: false,
            emailNotValid: false,
            badDOB: false,
        }
        this.userService = UserService.instance;
        this.userLogic = UserLogic.instance;
    }

    // Sets the field on change
    setUsername = (event) => {
        this.setState({username: event.target.value})
    }

    setPassword = (event) => {
        this.setState({password: event.target.value})
    }

    setPassword2 = (event) => {
        this.setState({password2: event.target.value})
    }

    setFirstName = (event) => {
        this.setState({firstName: event.target.value})
    }

    setLastName = (event) => {
        this.setState({lastName: event.target.value})
    }

    setEmail = (event) => {
        this.setState({email: event.target.value})
    }

    setDOB = (event) => {
        this.setState({dob: event.target.value})
    }

    reset = () => {
        this.setState({
            usernameEmpty: false,
            userNameTaken: false,
            passwordBad: false,
            password2Empty: false,
            passwordNoMatch: false,
            firstNameEmpty: false,
            lastNameEmpty: false,
            emailEmpty: false,
            emailNotValid: false,
            badDOB: false,
        }
        )
    }

    // Verify all fields
    verifyFields = () => {
        this.reset()
        const u = this.state.username
        const p1 = this.state.password
        const p2 = this.state.password2
        const f = this.state.firstName
        const l = this.state.lastName
        const e = this.state.email
        const d = this.state.dob
        let stop = false;

        if (u === '') {
            this.setState({ usernameEmpty: true })
            stop = true
        }

        if ((p1.length <= 6 || p1.length >= 12)
            || p1.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
            this.setState({ passwordBad: true })
            stop = true
        }

        if (p2 === '') {
            this.setState({ password2Empty: true })
            stop = true
        }

        if (p1 !== p2) {
            this.setState({ passwordNoMatch: true })
            stop = true
        }

        if (f === '') {
            this.setState({ firstNameEmpty: true })
            stop = true
        }

        if (l === '') {
            this.setState({ lastNameEmpty: true })
            stop = true
        }

        if (e === '') {
            this.setState({ emailEmpty: true })
            stop = true
        }

        // Empty or future date
        if (d === '' || new Date(d) > Date.now()) {
            this.setState({ badDOB: true })
            stop = true
        }

        // // TODO check if username taken
        // // userNameTaken: false,
        if (u.length > 0) {
            this.userService.findUserByUsername(u)
                .then((response) => {
                    if (response !== null) {
                        this.setState({userNameTaken: true})
                        stop = true
                        return;
                    }
                })
        }

        // TODO check if email is valid
        // Use API 
        // emailNotValid: false,

        if (!stop) {
            const user = {
                username: u,
                password: p1,
                firstName: f,
                lastName: l,
                email: e,
                dob: d,
                locations:[],
                passwords:[]
            }
            // Create the user and redirect
            this.userService.createUser(user)
                .then(user => {
                    if (user.userName) {
                        this.props.history.push('/profile')
                    }
                })
        }
        return;
    }

    render() {
        return (
            <div className="container col-md-6 col-md-offset-3" >
                <h1>Register</h1>

                {/* Username */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="username">
                        Username &nbsp;
                        {this.userLogic.usernameEmpty(this.state.usernameEmpty)}
                        {this.userLogic.usernameTaken(this.state.usernameTaken)}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            onChange={this.setUsername} />
                    </div>
                </div>

                {/* Password */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="password">
                        Password &nbsp;
                        {this.userLogic.passwordBad(this.state.passwordBad)}
                    </label>

                    <div className="col-sm-12">
                        <input type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={this.setPassword} />
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group row">

                    <label className="control-label col-12"
                        htmlFor="confirm-password">
                        Confirm Password &nbsp;
                        {this.userLogic.password2Empty(this.state.password2Empty)}
                        {this.userLogic.passwordNoMatch(this.state.passwordNoMatch)}
                    </label>

                    <div className="col-sm-12">
                        <input type="password"
                            className="form-control"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            onChange={this.setPassword2} />
                    </div>

                </div>

                {/* First Name */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="first-name">
                        First Name &nbsp;
                        {this.userLogic.firstNameEmpty(this.state.firstNameEmpty)}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="first-name"
                            placeholder="First Name"
                            onChange={this.setFirstName} />
                    </div>
                </div>

                {/* Last Name */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="last-name">
                        Last Name &nbsp;
                        {this.userLogic.lastNameEmpty(this.state.lastNameEmpty)}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="last-name"
                            placeholder="Last Name"
                            onChange={this.setLastName} />
                    </div>
                </div>

                {/* Email */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="email">
                        Email &nbsp;
                        {this.userLogic.emailEmpty(this.state.emailEmpty)}
                        {this.userLogic.emailNotValid(this.state.emailNotValid)}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            onChange={this.setEmail} />
                    </div>
                </div>

                {/* DOB */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="dob">
                        Date of Birth &nbsp;
                        {this.userLogic.dobNotValid(this.state.badDOB)}
                    </label>

                    <div className="col-sm-12">
                        <input type="date"
                            className="form-control"
                            id="dob"
                            placeholder="Date of Birth"
                            onChange={this.setDOB} />
                    </div>
                </div>

                {/* Register */}
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button className="btn btn-success"
                            type="button"
                            onClick={this.verifyFields}
                        >
                            Register
                    </button>
                    </div>
                </div>

                {/* Login */}
                <div className="form-group row no-account">
                    <label className="col-sm-10">
                        Already have an Account?
                        <div>
                            <Link to='/Login'>
                                <button className="btn btn-primary" type="button"> Login Now! </button>
                            </Link>
                        </div>
                    </label>
                </div>
            </div>
        )
    }
}