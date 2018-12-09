import React from 'react';
import { Link } from 'react-router-dom'
import UserService from '../Services/UserService'
import UserLogic from './Logic/user.logic';

// Login component
// on /login
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
            badCreds: false,
            long: '',
            lat: '',
            validLocation: false
        };
        this.userService = UserService.instance;
        this.userLogic = UserLogic.instance;
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
            badCreds: false
        })

        if (this.state.user.username === "") {
            this.setState({ usernameEmpty: true })
        }

        if (this.state.user.password === "") {
            this.setState({ passwordEmpty: true })
            return;
        }

        return this.userService.login(this.state.user)
            .then(user => {
                if (user !== null) {
                    this.compareLocation(user);
                    if (this.state.validLocation) {
                        window.location.reload()
                        this.props.history.push('/profile')
                    }
                } else {
                    this.setState({ badCreds: true })
                }
            })
    }

    // Sets the user's location when they log in
    compareLocation = (user) => {
        navigator.geolocation.getCurrentPosition(this.curretPostion);
        if (user.locations.lat && user.locations.long) {
            const lat1 = user.locations.lat
            const lat2 = this.state.lat
            const lon1 = user.locations.long
            const lon2 = this.state.long

            var φ1 = lat1 * Math.PI / 180;
            var φ2 = lat2 * Math.PI / 180;
            var Δφ = (lat2 - lat1) * Math.PI / 180;
            var Δλ = (lon2 - lon1) * Math.PI / 180;
            var R = 6371

            var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            var d = R * c;

            if (d <= user.locations.radius) {
                return this.setState({validLocation: true})
            }
        } else {
            return this.setState({validLocation: true})
        }
    }

    // Modifies current location and previous location
    curretPostion = (position) => {
        this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    }


    render() {
        return (
            <div className="container col-md-6 col-md-offset-3" >
                <h1>Sign In</h1>

                {/* Username */}
                <div className="form-group row">
                    <label className="control-label col-12"
                        htmlFor="username">
                        Username &nbsp;
                        {this.userLogic.usernameEmpty(this.state.usernameEmpty)}
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
                        {this.userLogic.passwordEmpty(this.state.passwordEmpty)}
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
                            onClick={this.login}>
                            Sign In
                        </button>
                        {this.userLogic.badCreds(this.state.badCreds)}
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
