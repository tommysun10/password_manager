import React from 'react';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
        }
    }

    // Check non-empty
    // Check Not taken
    checkUsername = () => {

    }

    render() {
        return (
            <div className="container col-md-6 col-md-offset-3" >
                <h2>Register</h2>

                {/* Username */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="username">
                        Username &nbsp;
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username" />
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
                            placeholder="Password" />
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group row">

                    <label className="control-label col-12"
                        htmlFor="confirm-password">
                        Confirm Password &nbsp;
                    </label>

                    <div className="col-sm-12">
                        <input type="password"
                            className="form-control"
                            id="confirm-password"
                            placeholder="Confirm Password" />
                    </div>

                </div>

                {/* First Name */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="first-name">
                        First Name &nbsp;
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="first-name"
                            placeholder="First Name" />
                    </div>
                </div>

                {/* Last Name */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="last-name">
                        Last Name &nbsp;
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="last-name"
                            placeholder="Last Name" />
                    </div>
                </div>

                {/* Last Name */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="email">
                        Email &nbsp;
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="email"
                            placeholder="Email" />
                    </div>
                </div>

                {/* DOB */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="dob">
                        Date of Birth &nbsp;
                    </label>

                    <div className="col-sm-12">
                        <input type="date"
                            className="form-control"
                            id="dob"
                            placeholder="Date of Birth" />
                    </div>
                </div>




                {/* Register */}
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button className="btn btn-success"
                            type="button"
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