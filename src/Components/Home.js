import React from 'react'
import UserService from '../Services/UserService';
import Welcome from './Welcome.js'
import PasswordList from './PasswordList.js'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}

        }
        this.userService = UserService.instance;
    }

    componentDidMount = () => {
        this.userService.isUserLoggedIn()
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
            return <PasswordList/>
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
