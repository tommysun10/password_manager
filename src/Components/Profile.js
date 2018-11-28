import React from 'react'
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService';
import UserLogic from './Logic/user.logic';

//TODO 
//Validate email

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            firstNameReadOnly: '',
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            locations: [],
            passwords: [],
            passwordBad: false,
            password2Empty: false,
            passwordNoMatch: false,
            firstNameEmpty: false,
            lastNameEmpty: false,
            emailEmpty: false,
            emailNotValid: false,
            badDOB: false,
            success: false
        }
        this.userService = UserService.instance;
        this.userLogic = UserLogic.instance;
    }

    reset = () => {
        this.setState(
            {
                passwordBad: false,
                password2Empty: false,
                passwordNoMatch: false,
                firstNameEmpty: false,
                lastNameEmpty: false,
                emailEmpty: false,
                emailNotValid: false,
                badDOB: false,
                success: false
            }
        )
    }

    update = () => {
        this.reset()
        const u = this.state.username
        const p1 = this.state.password
        const p2 = this.state.password2
        const f = this.state.firstName
        const l = this.state.lastName
        const e = this.state.email
        const d = this.state.dob
        let stop = false;

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
                locations: this.state.locations,
                passwords: this.state.passwords
            }

            // Create the user and redirect
            this.userService.updateUser(user)
                .then(user => {
                    if (user) {
                        this.setState({ success: true })
                        this.setState({firstNameReadOnly: f})
                    }
                })
        }
        return;
    }

    setPassword = (event) => {
        this.setState({ password: event.target.value })
    }

    setPassword2 = (event) => {
        this.setState({ password2: event.target.value })
    }

    setFirstName = (event) => {
        this.setState({ firstName: event.target.value })
    }

    setLastName = (event) => {
        this.setState({ lastName: event.target.value })
    }

    setEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    setDOB = (event) => {
        this.setState({ dob: event.target.value })
    }

    componentDidMount = () => {

        this.userService.getCurrentUser()
            .then(user => {
                const date = user.dob
                const parts = date.split("T")

                this.setState({
                    username: user.username,
                    firstNameReadOnly: user.firstName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dob: parts[0],
                    locations: user.locations,
                    passwords: user.passwords

                })
            })
    }

    render() {
        return (
            <div className="container col-md-6 col-md-offset-3" >
                <h1>Profile</h1>

                <h2> Welcome {this.state.firstNameReadOnly} </h2>

                {/* Username */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="username">
                        Username &nbsp;
                     </label>

                    <div className="col-sm-12">
                        <input readOnly type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={this.state.username} />
                    </div>
                </div>

                {/* Password */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="password">
                        Password &nbsp;
                        {this.userLogic.passwordEmpty(this.state.passwordEmpty)}
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
                            onChange={this.setFirstName}
                            value={this.state.firstName} />
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
                            onChange={this.setLastName}
                            value={this.state.lastName} />
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
                            onChange={this.setEmail}
                            value={this.state.email} />
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
                            onChange={this.setDOB}
                            value={this.state.dob} />
                    </div>
                </div>

                {/* Update */}
                <div className="form-group row">
                    <div className="col-sm-12">
                        {this.userLogic.successfulUpdate(this.state.success)}
                        <button className="btn btn-success btn-block"
                            type="button"
                            onClick={this.update}
                        >
                            Update
                        </button>
                    </div>
                </div>

                {/* Locations Tab */}
                <div className="form-group row">
                    <div className="col-sm-12">
                        <Link to='/user/locations'>
                            <button className="btn btn-secondary btn-block"
                                type="button"
                            >
                                View Login Locations
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
