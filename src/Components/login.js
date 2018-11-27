import React from 'react';
import {Link} from 'react-router-dom'
// TODO
// Implement user services for login validation
//      - Implement session
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            },
            usernameEmpty: false,
            passwordEmpty: false,
        }
    }

    // Updates state for user login forms
    userInputHandler = (a, event) => {
        if (a) {
            this.setState({
                user: {
                    username: event.target.value,
                    password: this.state.user.password,
                }
            });
        } else {
            this.setState({
                user: {
                    username: this.state.user.username,
                    password: event.target.value,
                }
            });
        }
    }

    // Validates login
    login = () => {
        this.setState({
            usernameEmpty: false,
            passwordEmpty: false,
        })

        if (this.state.user.username === "") {
            this.setState({ usernameEmpty: true })
        }

        if (this.state.user.password === "") {
            this.setState({ passwordEmpty: true })
            return;
        }

        // this.userServices.login(creds)
        //      .then(user => )

    }

    checkUsername = () => {
        if (this.state.usernameEmpty) {
            return (
                <span style={{ color: 'red' }}><br/>Please enter a username</span>
            )
        }
    }

    //Puts text to notify the user of the acceptability of their password
    checkPassword = () => {
        if (this.state.passwordEmpty) {
            return (
                <span style={{ color: 'red' }}><br/>Please enter a password</span>
            )
        }
    }

    render() {
        return (
            <div className="container col-md-6 col-md-offset-3" >
                <h2>Sign In</h2>

                {/* Username */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="username">
                        Username &nbsp;
                        {this.checkUsername()}
                    </label>

                    <div className="col-sm-12">
                        <input type="text"
                            className="form-control"
                            id="username"
                            onChange={(e) => this.userInputHandler(true, e)}
                            placeholder="Username" />
                    </div>
                </div>

                {/* Password */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="password">
                        Password &nbsp;
                        {this.checkPassword()}
                    </label>

                    <div className="col-sm-12">
                        <input type="password"
                            className="form-control"
                            id="password"
                            onChange={(e) => this.userInputHandler(false, e)}
                            placeholder="Password" />
                    </div>
                </div>

                {/* Sign In */}
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button className="btn btn-success"
                            type="button"
                            onClick={this.login}
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                {/* Register */}
                <div className="form-group row no-account">
                    <label className="col-sm-10">
                        Don't have an Account?
                            <div>
                            <Link to='/register'>
                                <button className="btn btn-primary" type="button"> Register</button>
                            </Link>
                        </div>
                    </label>
                </div>
            </div>
        )
    }
}