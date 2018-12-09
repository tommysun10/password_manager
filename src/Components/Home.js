import React from 'react'
import UserService from '../Services/UserService';
import Welcome from './Welcome.js'
import WebsiteList from './WebsiteList.js'

// The Home Page that renders on default url (/)
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}

        }
        this.userService = UserService.instance;
    }

    // Loads user on page load
    componentDidMount = () => {
        this.userService.getCurrentUser()
            .then(user => {
                if (user) {
                    this.setState({
                        user: user
                    })
                }
            })
    }

    // Dynamically determines if a user is logged in
    // renders the correct page
    renderPage = () => {
        if (this.state.user.username) {
            return <WebsiteList/>
        } else {
            return <Welcome/>
        }
    }


    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}
