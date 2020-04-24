const db = require('../database/usersdb');
const bcrypt = require('bcryptjs');
jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    db.register(req.user).then(res.status(201).send('Success!'))
    .catch(err => console.log(err));
}

exports.login = (req, res) => {
    let token = jwt.sign({}, process.env.KEY, {expiresIn: 60});
    db.login(req.user.username).then(user => {
        if (user === null || user === undefined) {res.status(404).send('No Such User'); return}
        if (bcrypt.compareSync(req.user.password, user.password)) {
            res.status(200).send({message: 'Welcome!', token: token})
        } else {
            res.status(400).send('Invalid Username or Password');
        }
    })
}