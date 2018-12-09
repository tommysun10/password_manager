let _singleton = Symbol();

// const SERVER_URL = 'http://localhost:4000/api';
const SERVER_URL = 'https://password-manager-server.herokuapp.com/api';

// All API calls are abstract here
export default class UserService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton];
    }

    // Login and sets the credentials into cookies
    login = (credentials) => {
        return fetch(SERVER_URL + '/login', {
            body: JSON.stringify(credentials),
            credentials: "include",
            method: "post",
            headers: {
                'content-type': 'application/json'
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return null;      
            }
        })
    }

    // Given an ID, return the user
    findUserById = (userId) => {
        return fetch(SERVER_URL + '/userId')
            .then(response => response.json())
    }

    // Creates a user
    createUser = (user) => {
        return fetch(SERVER_URL + "/register", {
            body: JSON.stringify(user),
            credentials: "include", // include, same-origin, *omit
            method: "post",
            headers: {
                "content-type": "application/json"
            }
        });
    }

    // Updates a user
    updateUser = (user) => {
        return fetch(SERVER_URL + "/user/update", {
            method: "put",
            credentials: "include",
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        }).then(response => response.json());
    }

    // Logs the user out
    logout = () => {
        return fetch(SERVER_URL + "/logout", {
            method: "POST",
            credentials: "include",
            headers: {
				'Content-type': 'application/json'
			},
        })
    }

    // Gets the current user
    getCurrentUser = () => {
        return fetch(SERVER_URL + '/currentUser', {
            credentials: 'include'
        }
        ).then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return null
            }
        })
    }

    // Finds if a user exists 
    findUserByUsername = (username)  => {
        return fetch(SERVER_URL + '/user/username', {
            method: 'post'
        })
            .then(response => {
                if (response.status === 200) {
                    return null
                } else {
                    return response.json();
                }
            })
    }
}
