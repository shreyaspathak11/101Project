"use strict";

// initialize express and express router
var express = require('express');

var router = express.Router(); // import from controllers

var _require = require('../controllers/User'),
    register = _require.register,
    login = _require.login,
    followUser = _require.followUser,
    logout = _require.logout,
    updateProfile = _require.updateProfile,
    updatePassword = _require.updatePassword,
    deleteMyProfile = _require.deleteMyProfile,
    myProfile = _require.myProfile,
    getUserProfile = _require.getUserProfile,
    getAllUsers = _require.getAllUsers,
    forgotPassword = _require.forgotPassword; // import from middlewares


var _require2 = require('../middlewares/auth'),
    isAuthenticated = _require2.isAuthenticated; //Routes


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuthenticated, followUser);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/delete/me")["delete"](isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/forgot/password").post(isAuthenticated, forgotPassword);
module.exports = router;