const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.registerUser);

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/fail' }), users.login);

module.exports = router;