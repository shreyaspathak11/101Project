const express = require('express');
const { register, login, followUser, logout, updateProfile, updatePassword } = require('../controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)

router.route("/follow/:id").get(isAuthenticated, followUser)
router.route("/update/profile").put(isAuthenticated, updateProfile)
router.route("/update/password").put(isAuthenticated, updatePassword)


module.exports = router;