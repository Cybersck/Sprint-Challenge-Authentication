const router = require('express').Router();
const authMiddle = require('./authenticate-middleware');
const authController = require('./authcontroller');

router.post('/register', authMiddle.validateRegistration, authController.register);

router.post('/login', authMiddle.validateLogin, authController.login);

module.exports = router;
