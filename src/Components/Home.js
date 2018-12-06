import React from 'react'
import UserService from '../Services/UserService';
import Welcome from './Welcome.js'
import WebsiteList from './WebsiteList.js'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}

        }
        this.userService = UserService.instance;
    }

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
