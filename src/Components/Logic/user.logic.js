import React from 'react'
let _singleton = Symbol();

// Applys JSX Errors based on the state 
// Abstracts out errors between multiple components
export default class UserLogic {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserLogic(_singleton);
        return this[_singleton];
    }

    // Returns JSX to show an empty username
    usernameEmpty = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}><br />Please enter a username</span>
            )
        }
    }

    // Returns JSX to show a taken username
    usernameTaken = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}><br />Username is taken</span>
            )
        }
    }

    // Returns JSX to show empty password
    passwordEmpty = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}><br />Please enter a password</span>
            )
        }
    }

    // Returns JSX to show a password that does not hit all requirements
    passwordBad = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Password must contain 6 to 12 characters, a letter, number, and special character
                </span>
            )
        }
    }

    // Returns JSX to show a password confirmation is empty
    password2Empty = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Please confirm your password
                </span>
            )
        }
    }

    // Returns JSX to show passwords do not match
    passwordNoMatch = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Your passwords must match
        </span>
            )
        }
    }

    // Returns JSX to show a lack of user with given creds
    badCreds = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}><br /> Bad username or password </span>
            )
        }
    }

    // Returns JSX to show an empty first name
    firstNameEmpty = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Please enter your first name
                </span>
            )
        }
    }

    // Returns JSX to show an empty last name
    lastNameEmpty = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Please enter your last name
                </span>
            )
        }
    }

    // Returns JSX to show an empty email
    emailEmpty = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Please enter your email
                </span>
            )
        }
    }

    // Returns JSX to show an invalid email
    emailNotValid = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Please enter a valid email
            </span>
            )
        }
    }

    // Returns JSX to show an invalid date of birthday
    dobNotValid = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}>
                    <br />
                    Please enter a valid date of birth
            </span>
            )
        }
    }

    // Returns JSX to show a successful update
    successfulUpdate = (state) => {
        if (state) {
            return (
                <span style={{ color: 'green' }}>
                Update successful!!
        </span>
            )
        }
    }

    // Returns JSX to show a website already exists (home page)
    websiteExists = (state) => {
        if (state) {
            return (
                <span style={{color:'red'}}>
                    <br/>
                    This already exists!
                </span>
            )
        }
    }

}