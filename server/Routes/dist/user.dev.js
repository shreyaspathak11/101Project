"use strict";

var express = require('express');

var _require = require('../controllers/User'),
    register = _require.register,
    login = _require.login,
    followUser = _require.followUser,
    logout = _require.logout;

var _require2 = require('../middlewares/auth'),
    isAuthenticated = _require2.isAuthenticated;

var router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuthenticated, followUser);
module.exports = router;