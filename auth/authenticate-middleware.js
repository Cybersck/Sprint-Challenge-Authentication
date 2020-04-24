const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.validateRegistration = (req, res, next) => {
  if (req.body.username === undefined ||
    req.body.password === undefined) {
      res.status(400).send('Missing Required Data');
    } else {
      req.user = {username: req.body.username, password: bcrypt.hashSync(req.body.password, 10)}
      next();
    }
}

exports.validateLogin = (req, res, next) => {
  if (req.body.username === undefined ||
      req.body.password === undefined) {
        res.status(400).send('Missing Required Data');
    } else {
      req.user = {username: req.body.username, password: req.body.password}
      next();
    }
}

exports.validateAuth = (req, res, next) => {
  if (req.headers.authorization !== undefined) {
    jwt.verify(req.headers.authorization, process.env.KEY, (err, decoded) => {
      if (err) {
        res.status(401).send(err);
      } else {
        next();
      }
    })
  } else {
    res.status(400).send('Missing Token');
  }
}