let _singleton = Symbol();

const server = 'http://localhost:3000';

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

    login = (credentials) => {

    }
}