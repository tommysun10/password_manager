import React from 'react'
import { Route } from 'react-router-dom'
import UserService from '../Services/UserService'
import UserLogic from './Logic/user.logic';
import WebsiteRow from './WebsiteRow';

export default class PasswordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            newWebsite: '',
            websiteExists: false
        }
        this.userService = UserService.instance
        this.userLogic = UserLogic.instance
    }

    setNewWebsite = (event) => {
        this.setState({
            newWebsite: event.target.value
        })
    }

    remountUser = () => {
        return this.userService.getCurrentUser()
        .then(user => {
            this.setState({ user: user })
        })
    }

    addWebsite = () => {
        this.reset()
        let u = this.state.user

        // This is a hashmap of website to array of user/pw combos
        let passwords = u.passwords
        if (passwords != null && passwords.hasOwnProperty(this.state.newWebsite)) {
            return this.setState({ websiteExists: true })
        } else {
            passwords[this.state.newWebsite] = {};
            u.passwords = passwords;
            return this.userService.updateUser(u)
                .then(() =>this.remountUser()
                )
        }
    }

    deleteWebsite = (website) => {
        let u = this.state.user;

        delete u.passwords[website]

        this.userService.updateUser(u)
            .then(user => {
                this.setState({
                    user: user
                })
            })
    }

    isActive = (website) => {

    }

    setActive = (website) => {

    }

    renderWebsites = () => {
        if (this.state.user.passwords != null) {
            let rows = Object.entries(this.state.user.passwords)
                .map((website) => {
                    return (
                        <WebsiteRow website={website} key={website[0]}
                            delete={this.deleteWebsite} isActive={this.isActive}
                            setActive={this.setActive} />
                    )
                }
                )
            return (rows);
        }
    }

    componentDidMount = () => {
        return this.remountUser();
    }

    reset = () => {
        this.setState({ websiteExists: false })
    }

    render() {
        return (
            <div>
                <div className="input-group col-4">
                    <input className="form-control"
                        placeholder="Name"
                        value={this.state.newWebsite}
                        onChange={this.setNewWebsite}
                        value={this.state.newWebsite} />
                    <button className="btn btn-secondary"
                        onClick={this.addWebsite}>
                        Add
                    </button>
                    {this.userLogic.websiteExists(this.state.websiteExists)}
                </div>
                
                <ul>
                    {this.renderWebsites()}
                </ul>
            </div>
        )
    }
}