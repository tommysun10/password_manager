let _singleton = Symbol();

const SERVER_URL = 'http://localhost:3000/api';

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
    login(credentials) {
        return fetch(SERVER_URL + '/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => {
            return response.json()
        })
    }

    // Given an ID, return the user
    findUserById(userId) {
        return fetch(SERVER_URL + '/userId')
            .then(response => response.json())
    }

    // Creates a user
    createUser(user) {
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
    updateUser(user) {
		return fetch(SERVER_URL + "/" + user.id, {
			method: "put",
			body: JSON.stringify(user),
			headers: {
				"content-type": "application/json"
			},
			credentials: "include"
		}).then(response => response.json());
    }
    
    // Logs the user out
    logout() {
		return fetch(SERVER_URL + "/logout", {
			method: "POST",
			credentials:"include"
		})
    }
    
    // Returns the current user if someone is logged in
    getProfile() {
        return fetch(SERVER_URL + '/profile', {
            credentials: 'include'
            }
        ).then(response => {
            response.json()
        })
    }

    // Finds if a user exists 
  findUserByUsername(username){
    return fetch(SERVER_URL + '/username/' + username)
        .then(response => {
            response.json()
        }).catch(err => {
            return null;
        })
}
}