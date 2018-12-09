import React from 'react'

// Welcome page for unlogged in users
export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1> Welcome to Password Manager </h1>
                <h2> Please Register or Login to get started</h2>
            </div>
        )
    }
}