"use strict";

var express = require('express');

var _require = require('../controllers/User'),
    register = _require.register,
    login = _require.login;

var router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
module.exports = router;