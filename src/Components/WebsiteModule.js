import React from 'react'
import UserService from '../Services/UserService'
import '../Style/style.css'

export default class WebsiteModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: '',
            password: '',
            email: '',
            comments: ''
        }
        this.userService = UserService.instance;
    }

    setUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    setPassword = (event) => {
        this.setState({ password: event.target.value })
    }

    setEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    setComments = (event) => {
        this.setState({ comments: event.target.value })
    }

    addModule = () => {
        const newLogin = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            comments: this.state.comments
        }

        let website = this.props.website
        const key = website[0]

        let curUser = this.state.user
        let passwords = curUser.passwords

        passwords[key].push(newLogin);

        curUser.passwords = passwords;

        this.userService.updateUser(curUser)
            .then(() => 
            this.remount())
    }

    componentDidMount = () => {
        this.remount()
    }

    remount =() => {
        this.userService.getCurrentUser()
            .then(user => {
                this.setState({
                    user: user,
                    username: '',
                    password: '',
                    email: '',
                    comments: ''
                })
            })
    }

    renderModules = () => {

    }

    test =() => {
        console.log(this.props.website)
        console.log(this.state.user)
    }

    render() {
        return (
            <div className="container right-side">
                <div className="add-module">

                    {/* Username */}
                    <span className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Username" 
                            value={this.state.username}
                            onChange={this.setUsername}/>
                    </span>

                    {/* Password */}
                    <span className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Password" 
                            value={this.state.password}
                            onChange={this.setPassword}/>
                    </span>

                    {/* Email */}
                    <span className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.setEmail}/>
                    </span>

                    {/* Comments */}
                    <span className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Comments"
                            value={this.state.comments}
                            onChange={this.setComments}/>
                    </span>

                    <button className={`btn btn-secondary btn-block`}
                        onClick={this.addModule}>
                        Add
                    </button>

                </div>

                <div className="modules">
                </div>
            </div>
        )
    }
}