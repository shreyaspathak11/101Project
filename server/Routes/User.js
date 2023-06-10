// initialize express and express router
const express = require('express');                      
const router = express.Router();
// import from controllers
const { register, login, followUser, logout, updateProfile, updatePassword, deleteMyProfile, myProfile, getUserProfile, getAllUsers } = require('../controllers/User');
// import from middlewares
const { isAuthenticated } = require('../middlewares/auth');

//Routes
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)

router.route("/follow/:id").get(isAuthenticated, followUser)
router.route("/update/profile").put(isAuthenticated, updateProfile)
router.route("/update/password").put(isAuthenticated, updatePassword)
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/users").get(isAuthenticated, getAllUsers);



module.exports = router;