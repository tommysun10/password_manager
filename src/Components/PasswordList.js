import React from 'react'
import UserService from '../Services/UserService'

export default class PasswordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.userService = UserService.instance
    }

    componentDidMount = () => {
        this.userService.getCurrentUser()
            .then(user => {
                this.setState({ user: user })
            })
    }

    render() {
        return (
            <div className="module-editor">
            <div className="module-container col-md-3">
              <div className="add-module input-group">
                <input className="form-control"
                      placeholder="Module name"/>
                  <button className="btn btn-secondary">Add</button>
              </div>
              <ul>
              </ul>
            </div>
          </div>
        )
    }
}