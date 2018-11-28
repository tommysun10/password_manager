import React from 'react'
import {Link} from 'react-router-dom'
import UserService from '../Services/UserService';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                dateOfBirth: '',
                locations: [],
                passwords: []
            },
            password: '',
            password2: '',
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
        }
        this.userService = UserService.instance;
    }

    update = () => {

    }

    setFirstName = () => {

    }

    setLastName = () => {

    }

    setPassword = () => {

    }

    setPassword2 = () => {

    }

    firstNameErrors = () => {

    }

    lastNameErrors = () => {

    }

    passwordError = () => {

    }

    emailErrors = () => {

    }

    dobErrors = () => {

    }

    componentDidMount = () => {

        this.userService.getCurrentUser()
            .then(user => {
                const date = user.dob
                const parts = date.split("T")

                this.setState({
                    user: user,
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

                <h2> Welcome {this.state.user.firstName} </h2>

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
                            value={this.state.user.username} />
                    </div>
                </div>

                {/* Password */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="password">
                        Password &nbsp;
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
                        {this.passwordError()}
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
                        {this.firstNameErrors()}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="first-name"
                            placeholder="First Name"
                            onChange={this.setFirstName}
                            value={this.state.user.firstName} />
                    </div>
                </div>

                {/* Last Name */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="last-name">
                        Last Name &nbsp;
                    {this.lastNameErrors()}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="last-name"
                            placeholder="Last Name"
                            onChange={this.setLastName}
                            value={this.state.user.lastName} />
                    </div>
                </div>

                {/* Email */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="email">
                        Email &nbsp;
                    {this.emailErrors()}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            onChange={this.setEmail}
                            value={this.state.user.email} />
                    </div>
                </div>

                {/* DOB */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="dob">
                        Date of Birth &nbsp;
                    {this.dobErrors()}
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
