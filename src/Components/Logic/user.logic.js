import React from 'react'
let _singleton = Symbol();


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

    // Puts text to notifiy the user of bad credentials
    badCreds = (state) => {
        if (state) {
            return (
                <span style={{ color: 'red' }}><br /> Bad username or password </span>
            )
        }
    }


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

}