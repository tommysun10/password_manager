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
            comments: '',
            edit: false,
            setEdit: ''
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

    button = () => {
        if (this.state.edit) {
            return (
                <button className={`btn btn-success btn-block`}
                    onClick={this.editModule}>
                    Update
                </button>
            )
        } else {
            return (
                <button className={`btn btn-secondary btn-block`}
                    onClick={this.addModule}>
                    Add
            </button>
            )
        }
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

    editModule = () => {
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
        let websiteReal = passwords[key]
        websiteReal[this.state.setEdit] = newLogin;

        this.userService.updateUser(curUser)
            .then(() => this.remount())
                
    }

    deleteModule = () => {

    }

    setEdit = (module) => {
        const passwords = this.props.website[1]
        const curMod = passwords[module]
        this.setState({
            setEdit:module,
            username:curMod.username,
            password:curMod.password,
            email:curMod.email,
            comments:curMod.comments,
            edit:true
        })
    }

    componentDidMount = () => {
        this.remount()
    }

    remount = () => {
        this.userService.getCurrentUser()
            .then(user => {
                this.setState({
                    user: user,
                    username: '',
                    password: '',
                    email: '',
                    comments: '',
                    edit: false,
                    setEdit: ''
                })
            })
    }

    renderModules = () => {
        let rows = this.props.website[1].map((module, i) => {
            return (
                <div className="each-module" key={i}>
                    {/* Username */}
                    < span className="form-group" >
                        <input type="text"
                            className="form-control"
                            placeholder="Username"
                            value={module.username}
                            readOnly />
                    </span >

                    {/* Password */}
                    < span className="form-group" >
                        <input type="text"
                            className="form-control"
                            placeholder="Password"
                            value={module.password} 
                            readOnly/>
                    </span >

                    {/* Email */}
                    < span className="form-group" >
                        <input type="text"
                            className="form-control"
                            placeholder="Email"
                            value={module.email}
                            readOnly/>
                    </span >

                    {/* Comments */}
                    < span className="form-group" >
                        <input type="text"
                            className="form-control"
                            placeholder="Comments"
                            value={module.comments}
                            readOnly/>
                    </span >
                    <button className={`btn btn-primary btn-block`}
                    onClick={() => this.setEdit(i)}>
                        Edit
                    </button>
                    <button className={`btn btn-danger btn-block d-block`}
                    onClick={() => this.deleteModule(i)}>
                        Delete
                    </button>
                </div>
            )
        })

        return rows
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
                            onChange={this.setUsername} />
                    </span>

                    {/* Password */}
                    <span className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.setPassword} />
                    </span>

                    {/* Email */}
                    <span className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.setEmail} />
                    </span>

                    {/* Comments */}
                    <span className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Comments"
                            value={this.state.comments}
                            onChange={this.setComments} />
                    </span>
                    {this.button()}
                </div>

                <div className="modules">
                    {this.renderModules()}
                </div>
            </div>
        )
    }
}