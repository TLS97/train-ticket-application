const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.registerUser);

router.route('/login')
    .get(users.renderLoginForm)
    .post(users.login);

module.exports = router;