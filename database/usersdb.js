const db = require('./dbConfig');

module.exports = {
    register,
    login
}

function register(user) {
    return db('users').insert(user);
}

function login(username) {
    return db('users').where('username', username).first().then(user => {
        return user;
    });
}

