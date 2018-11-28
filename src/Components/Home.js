import React from 'react'
import UserService from '../Services/UserService';

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
            .then (user => {
                if (user) {
                    this.setState({
                        user: user
                    })
                }
            })
    }
  render() {
    return (
      <div>
        {this.state.user.username}
      </div>
    )
  }
}
