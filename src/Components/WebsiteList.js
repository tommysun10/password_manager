import React from 'react'
import UserService from '../Services/UserService'
import UserLogic from './Logic/user.logic';
import WebsiteRow from './WebsiteRow';
import '../Style/style.css'

// Master class for rendering the home page when a user is logged in
// Renders websites on the left side
// Renders all saved information on the right side
export default class PasswordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: '',
            password: '',
            email: '',
            comments: '',
            newWebsite: '',
            websiteExists: false,
            activeWebsite: '',
            edit: false,
            setEdit: ''
        }
        this.userService = UserService.instance
        this.userLogic = UserLogic.instance
    }

    //Setters
    setNewWebsite = (event) => {
        this.setState({
            newWebsite: event.target.value
        })
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

    // Reset method but for remounting
    remountUser = () => {
        return this.userService.getCurrentUser()
            .then(user => {
                this.setState({ 
                    user: user,
                    newWebsite: '',
                    websiteExists: false,
                    activeWebsite: [],
                    username: '',
                    password: '',
                    email: '',
                    comments: '',
                    edit: false,
                    setEdit: ''
                 })
            })
    }

    // Adds a website
    addWebsite = () => {
        this.reset()
        let u = this.state.user

        // This is a hashmap of website to array of user/pw combos
        let passwords = u.passwords
        if (passwords != null && passwords.hasOwnProperty(this.state.newWebsite)) {
            return this.setState({ websiteExists: true })
        } else {
            passwords[this.state.newWebsite] = [];
            u.passwords = passwords;
            return this.userService.updateUser(u)
                .then(() => this.remountUser()
                )
        }
    }

    // deletes a website
    deleteWebsite = (website) => {
        let u = this.state.user;
        const p = u.passwords
        let p2 = {}

        // Filter out this website
        for (var key in p) {
            if (p.hasOwnProperty(key) && key !== website[0]) {
                p2[key] = p[key]
            }
        }

        u.passwords = p2;

        this.userService.updateUser(u)
            .then(() => this.remountUser())
    }

    // Determines if the clicked website is the current one
    isActive = (website) => {
        if (website[0] === this.state.activeWebsite[0]) {
            return 'list-group-item active';
        } else {
            return 'list-group-item';
        }
    }

    setActive = (website) => {
        this.setState({ activeWebsite: website });
    }

    // Button that adds or updates a saved module
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

    // Adds module (username/password combo)
    addModule = () => {
        const newLogin = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            comments: this.state.comments
        }

        let website = this.state.activeWebsite
        const key = website[0]

        let curUser = this.state.user
        let passwords = curUser.passwords

        passwords[key].push(newLogin);

        curUser.passwords = passwords;

        this.userService.updateUser(curUser)
            .then(() => this.remountUser())
    }

    // Edits the existing module
    editModule = () => {
        const newLogin = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            comments: this.state.comments
        }

        let website = this.state.activeWebsite
        const key = website[0]

        let curUser = this.state.user
        let passwords = curUser.passwords
        let websiteReal = passwords[key]
        websiteReal[this.state.setEdit] = newLogin;

        this.userService.updateUser(curUser)
            .then(() => this.remountUser())    
    }

    // Deletes the Module
    deleteModule = (index) => {
        let website = this.state.activeWebsite
        const key = website[0]

        let curUser = this.state.user
        let passwords = curUser.passwords
        let websiteReal = passwords[key]
        websiteReal.splice(index,1)

        this.userService.updateUser(curUser)
            .then(() => this.remountUser())
    }

    // Saves the edit
    setEdit = (module) => {
        const passwords = this.state.activeWebsite[1]
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

    // Renders the websites (left side)
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

    // Renders the adding module
    renderModule = () => {
        if (this.state.activeWebsite != '') {
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

    // Renders all saved modules
    renderModules = () => {
        let rows = this.state.activeWebsite[1].map((module, i) => {
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

    // Mounts the user on page load
    componentDidMount = () => {
        return this.remountUser();
    }

    // Reset on mount
    reset = () => {
        this.setState({ websiteExists: false })
    }

    // Removes the indent from natural UL 
    style = {
        padding: 0,
        listStyleType: false
    };

    render() {
        return (
            <div className="website-editor">
                <div className="website-container col-4">
                    <div className="add-website input-group">
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

                    <ul style={this.style}>
                        {this.renderWebsites()}
                    </ul>
                </div>
                <div className="col-8 passwords">
                    {this.renderModule()}
                </div>
            </div>
        )
    }
}