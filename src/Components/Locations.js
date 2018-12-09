import React from 'react'
import UserService from '../Services/UserService'

// Renders the Locations component
// Accessible by the profiles page
// url is at /locations
export default class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            latitude: '',
            longitude: '',
            diameter: ''
        };
        this.userService = UserService.instance;
    }

    // Setters for the fields
    setLatitude = (event) => {
        this.setState({ latitude: event.target.value })
    }

    setLongitude = (event) => {
        this.setState({ longitude: event.target.value })
    }

    setDiameter= (event) => {
        this.setState({ diameter: event.target.value })
    }

    // Saves settings on button click
    setSettings = () => {
        const u = this.state.user;
        u.locations.lat = this.state.latitude
        u.locations.long = this.state.longitude
        u.locations.diameter = this.state.diameter

        this.userService.updateUser(u)
            .then(user => {
                this.setState({
                    user:user
                })
                alert("Saved!")
            })
    }

    // Mounts users
    componentDidMount = () => {
        this.userService.getCurrentUser()
            .then(user => {
                this.setState({ 
                    user: user,
                    latitude: user.locations.lat,
                    longitude: user.locations.long,
                    diamater: user.locations.diameter
                 })
            })
    }

    render() {
        return (
            <div className="container col-md-6 col-md-offset-3" >
                <h1>Set allowed Locations!</h1>

                {/* Lat */}
                <div className="form-group row">
                    <label className="control-label col-8"
                        htmlFor="latitude">
                        Latitude &nbsp;
                    </label>

                    <div className="col-sm-8">
                        <input type="number"
                            className="form-control"
                            id="latitude"
                            onChange={this.setLatitude}
                            placeholder="Latitude"
                            value={this.state.latitude}/>
                    </div>
                </div>

                {/* Long */}
                <div className="form-group row">
                    <label className="control-label col-8"
                        htmlFor="longitude">
                        Longitude &nbsp;
                    </label>

                    <div className="col-sm-8">
                        <input type="number"
                            className="form-control"
                            id="longitude"
                            onChange={this.setLongitude}
                            placeholder="Longitude"
                            value={this.state.longitude}/>
                    </div>
                </div>

                {/* Radius */}
                <div className="form-group row">
                    <label className="control-label col-8"
                        htmlFor="Diameter">
                        Diameter(km) &nbsp;
                    </label>

                    <div className="col-sm-8">
                        <input type="number"
                            className="form-control"
                            id="Diameter"
                            onChange={this.setDiameter}
                            placeholder="Diameter"
                            value={this.state.diameter} />
                    </div>
                </div>

                <button onClick={this.setSettings}>Save Settings</button>
            </div>
        )
    }
}